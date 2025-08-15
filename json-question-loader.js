/**
 * JSON-based Question Loader for PLC LOGO Curriculum Worksheets
 * Dynamically loads and renders questions from JSON files
 */

class JSONQuestionLoader {
    constructor() {
        this.questions = [];
        this.worksheetData = null;
    }

    /**
     * Load questions from JSON file
     * @param {string} jsonPath - Path to the JSON file
     */
    async loadQuestionsFromJSON(jsonPath) {
        try {
            const response = await fetch(jsonPath);
            if (!response.ok) {
                throw new Error(`Failed to load questions: ${response.status}`);
            }
            
            this.worksheetData = await response.json();
            this.questions = this.worksheetData.worksheet.questions;
            
            console.log(`Loaded ${this.questions.length} questions from ${jsonPath}`);
            return this.worksheetData;
        } catch (error) {
            console.error('Error loading questions:', error);
            throw error;
        }
    }

    /**
     * Render questions in the existing worksheet structure
     * @param {string} containerSelector - CSS selector for the questions container
     */
    renderQuestions(containerSelector = '.questions-content') {
        const container = document.querySelector(containerSelector);
        if (!container) {
            console.error('Questions container not found');
            return;
        }

        // Clear existing content
        container.innerHTML = '';

        // Render each question
        this.questions.forEach((question, index) => {
            const questionHTML = this.generateQuestionHTML(question);
            container.insertAdjacentHTML('beforeend', questionHTML);
        });

        // Initialize event listeners
        this.initializeEventListeners();
    }

    /**
     * Generate HTML for a single question
     * @param {Object} question - Question data from JSON
     */
    generateQuestionHTML(question) {
        const optionsHTML = question.options.map(option => `
            <label class="option-label">
                <input type="radio" name="question-${question.id}" value="${option.key}" class="option-radio">
                <span class="option-text">${option.key}) ${option.text}</span>
            </label>
        `).join('');

        return `
            <div class="question-item" data-question="${question.id}">
                <h4>Question ${question.id}: ${question.question}</h4>
                <div class="multiple-choice-options">
                    ${optionsHTML}
                </div>
                <div class="question-actions">
                    <button class="submit-question-btn" onclick="jsonQuestionLoader.submitAnswer(${question.id})">Submit Answer</button>
                </div>
                <div class="correct-answer" style="display: none; margin-top: 15px; padding: 15px; background: #1a2f1a; border-radius: 4px; border-left: 3px solid #4CAF50;">
                    <strong style="color: #4CAF50;">Correct Answer:</strong> ${question.correctAnswerText}
                    ${question.explanation ? `<br><br><em>Explanation:</em> ${question.explanation}` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Submit answer for a question
     * @param {number} questionNumber - Question ID
     */
    submitAnswer(questionNumber) {
        const answerInput = document.querySelector(`[data-question="${questionNumber}"]`);
        if (!answerInput) return;
        
        const selectedOption = document.querySelector(`input[name="question-${questionNumber}"]:checked`);
        if (!selectedOption) {
            alert('Please select an answer before submitting.');
            return;
        }
        
        const answer = selectedOption.value;
        const question = this.questions.find(q => q.id === questionNumber);
        
        if (!question) {
            console.error('Question not found:', questionNumber);
            return;
        }
        
        // Save with enhanced tracking
        if (typeof worksheetTracker !== 'undefined') {
            worksheetTracker.saveAnswer(this.worksheetData.worksheet.id, questionNumber, answer, 'maintenance');
        }
        
        // Check if the answer is correct
        const isCorrect = question.correctAnswer === answer;
        
        // Show the correct answer
        const correctAnswerDiv = answerInput.querySelector('.correct-answer');
        if (correctAnswerDiv) {
            correctAnswerDiv.style.display = 'block';
        }
        
        // Disable all options for this question
        const allOptions = answerInput.querySelectorAll('input[type="radio"]');
        allOptions.forEach(option => option.disabled = true);
        
        // Hide the submit button
        const submitBtn = answerInput.querySelector('.submit-question-btn');
        if (submitBtn) {
            submitBtn.style.display = 'none';
        }
        
        // Update tracking
        if (typeof worksheetTracker !== 'undefined') {
            worksheetTracker.setQuestionCompleted(this.worksheetData.worksheet.id, questionNumber, isCorrect);
        }
        
        // Provide visual feedback
        this.showAnswerFeedback(answerInput, isCorrect);
        
        console.log(`Question ${questionNumber}: ${isCorrect ? 'Correct' : 'Incorrect'} (Answer: ${answer}, Correct: ${question.correctAnswer})`);
    }

    /**
     * Show visual feedback for answer submission
     * @param {Element} questionElement - The question DOM element
     * @param {boolean} isCorrect - Whether the answer was correct
     */
    showAnswerFeedback(questionElement, isCorrect) {
        const feedbackClass = isCorrect ? 'answer-correct' : 'answer-incorrect';
        questionElement.classList.add(feedbackClass);
        
        // Add temporary border color
        questionElement.style.borderLeft = `4px solid ${isCorrect ? '#4CAF50' : '#f44336'}`;
        questionElement.style.backgroundColor = isCorrect ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)';
        
        // Remove feedback after animation
        setTimeout(() => {
            questionElement.style.backgroundColor = '';
        }, 2000);
    }

    /**
     * Initialize event listeners for dynamic functionality
     */
    initializeEventListeners() {
        // Load saved answers
        this.loadSavedAnswers();
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.type === 'radio') {
                const questionItem = e.target.closest('.question-item');
                const submitBtn = questionItem.querySelector('.submit-question-btn');
                if (submitBtn && submitBtn.style.display !== 'none') {
                    const questionNumber = parseInt(questionItem.dataset.question);
                    this.submitAnswer(questionNumber);
                }
            }
        });
    }

    /**
     * Load previously saved answers
     */
    loadSavedAnswers() {
        if (typeof worksheetTracker === 'undefined') return;
        
        this.questions.forEach(question => {
            const savedAnswer = worksheetTracker.getAnswer(this.worksheetData.worksheet.id, question.id);
            if (savedAnswer) {
                const radioInput = document.querySelector(`input[name="question-${question.id}"][value="${savedAnswer}"]`);
                if (radioInput) {
                    radioInput.checked = true;
                }
            }
        });
    }

    /**
     * Get worksheet metadata
     */
    getWorksheetData() {
        return this.worksheetData;
    }

    /**
     * Get questions array
     */
    getQuestions() {
        return this.questions;
    }
}

// Create global instance
const jsonQuestionLoader = new JSONQuestionLoader();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Try to auto-detect worksheet number and load corresponding JSON
    const worksheetMatch = window.location.pathname.match(/worksheet-(\d+)\.html/);
    if (worksheetMatch) {
        const worksheetNumber = worksheetMatch[1];
        const jsonPath = `dev-tools/worksheet-${worksheetNumber}-qa-export.json`;
        
        try {
            await jsonQuestionLoader.loadQuestionsFromJSON(jsonPath);
            jsonQuestionLoader.renderQuestions();
            console.log('JSON-based questions loaded successfully');
        } catch (error) {
            console.warn('Could not load JSON questions, falling back to static HTML:', error.message);
        }
    }
});
