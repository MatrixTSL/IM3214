# 📋 PLC Curriculum Directory Cleanup Checklist

## **Project Overview**
**Goal**: Reorganize the PLC curriculum directory structure for better maintainability and cleaner organization.

**Strategy**: Implement changes in phases, from lowest risk to highest risk, with testing and git commits between each phase.

---

## **Phase 1: Build and Development Tools Consolidation** ✅ **LOW RISK - START HERE**

### **Objective**: Organize all development and build files
### **Target Structure**:
```
/dev-tools/           (existing)
  /build/             (new)
    build-release.bat
    create-release.bat
  /workspace/         (new)  
    Closed Loop Maintenance PC Companion.code-workspace
  git push.txt        (existing)
  server.js           (existing)
  server.py           (existing)
```

### **Tasks Checklist**:
- [ ] Create `/dev-tools/build/` directory
- [ ] Create `/dev-tools/workspace/` directory
- [ ] Move `/scripts/build-release.bat` → `/dev-tools/build/`
- [ ] Move `/scripts/create-release.bat` → `/dev-tools/build/`
- [ ] Move `/meta/Closed Loop Maintenance PC Companion.code-workspace` → `/dev-tools/workspace/`
- [ ] Remove empty `/scripts/` directory
- [ ] Remove empty `/meta/` directory
- [ ] Test: Verify no references to moved files in code
- [ ] **Git commit**: "Phase 1: Reorganize build tools and workspace files"

### **Files Updated**: None (no code references)
### **Risk Level**: ✅ **LOW** - No code dependencies

---

## **Phase 2: Documentation and Archive Review** ✅ **LOW RISK**

### **Objective**: Organize documentation and review archived files
### **Target Structure**:
```
/docs/               (existing - analyze and organize)
/archived/           (existing - review for deletion)
```

### **Tasks Checklist**:
- [ ] Analyze `/docs/` folder contents
- [ ] Organize documents by type (PDFs, manuals, etc.)
- [ ] Review `/archived/worksheet-original-backup.html`
- [ ] Determine if archived files are still needed
- [ ] Consider creating `/docs/archived/` for old documentation
- [ ] Consider moving LICENSE and README.md (optional)
- [ ] **Git commit**: "Phase 2: Organize documentation and review archives"

### **Files Updated**: None
### **Risk Level**: ✅ **LOW** - Documentation only

---

## **Phase 3: JavaScript Module Reorganization** ⚠️ **MEDIUM RISK**

### **Objective**: Group JavaScript files by functionality
### **Target Structure**:
```
/src/
  /js/
    /core/          
      worksheet-core.js
      shared-navigation.js
      service-worker.js
    /handlers/      
      worksheet-fault-handler.js
      worksheet-maintenance-handler.js
    /utils/         
      pdf-popup.js
      image-fallback.js
      pwa-install.js
    /tracking/      
      worksheet-tracking.js
      worksheet-debug.js
```

### **Tasks Checklist**:
- [ ] Create `/src/js/core/` directory
- [ ] Create `/src/js/handlers/` directory
- [ ] Create `/src/js/utils/` directory
- [ ] Create `/src/js/tracking/` directory
- [ ] Move `worksheet-core.js` → `/src/js/core/`
- [ ] Move `shared-navigation.js` → `/src/js/core/`
- [ ] Move `service-worker.js` → `/src/js/core/`
- [ ] Move `worksheet-fault-handler.js` → `/src/js/handlers/`
- [ ] Move `worksheet-maintenance-handler.js` → `/src/js/handlers/`
- [ ] Move `pdf-popup.js` → `/src/js/utils/`
- [ ] Move `image-fallback.js` → `/src/js/utils/`
- [ ] Move `pwa-install.js` → `/src/js/utils/`
- [ ] Move `worksheet-tracking.js` → `/src/js/tracking/`
- [ ] Move `worksheet-debug.js` → `/src/js/tracking/`

### **Files to Update**:
- [ ] `index.html` - Update script src paths
- [ ] `about.html` - Update script src paths
- [ ] `CP6211-worksheets.html` - Update script src paths
- [ ] `tracking-dashboard.html` - Update script src paths
- [ ] `worksheet-1.html` through `worksheet-12.html` - Update script src paths (12 files)
- [ ] `service-worker.js` - Update cache paths for all JS files
- [ ] `worksheet-core.js` - Update dynamic script loading paths
- [ ] `package.json` - Update build asset paths

### **Testing Required**:
- [ ] Test homepage loads correctly
- [ ] Test worksheet navigation works
- [ ] Test shared navigation functions
- [ ] Test PWA install functionality
- [ ] Test service worker caching
- [ ] Test all worksheet interactive features
- [ ] **Git commit**: "Phase 3: Reorganize JavaScript modules into logical folders"

### **Risk Level**: ⚠️ **MEDIUM** - Many path updates required

---

## **Phase 4: CSS and Styling Organization** ⚠️ **MEDIUM RISK**

### **Objective**: Centralize styling resources
### **Target Structure**:
```
/src/
  /css/
    main.css
    main.css.backup (if exists)
```

### **Tasks Checklist**:
- [ ] Create `/src/css/` directory
- [ ] Move `main.css` → `/src/css/`
- [ ] Move `main.css.backup` → `/src/css/` (if exists)

### **Files to Update**:
- [ ] `index.html` - Update CSS href path
- [ ] `about.html` - Update CSS href path
- [ ] `CP6211-worksheets.html` - Update CSS href path
- [ ] `tracking-dashboard.html` - Update CSS href path
- [ ] `worksheet-1.html` through `worksheet-12.html` - Update CSS href paths (12 files)
- [ ] `service-worker.js` - Update CSS cache path
- [ ] `package.json` - Update CSS build path

### **Testing Required**:
- [ ] Test all pages render correctly
- [ ] Test responsive design works
- [ ] Test PWA offline styling
- [ ] **Git commit**: "Phase 4: Move CSS files to organized structure"

### **Risk Level**: ⚠️ **MEDIUM** - Styling path updates needed

---

## **Phase 5: Worksheet Pages Organization** ⚠️ **MEDIUM RISK**

### **Objective**: Group all worksheet pages
### **Target Structure**:
```
/worksheets/
  worksheet-1.html
  worksheet-2.html
  ...
  worksheet-12.html
```

### **Tasks Checklist**:
- [ ] Create `/worksheets/` directory
- [ ] Move `worksheet-1.html` → `/worksheets/`
- [ ] Move `worksheet-2.html` → `/worksheets/`
- [ ] Move `worksheet-3.html` → `/worksheets/`
- [ ] Move `worksheet-4.html` → `/worksheets/`
- [ ] Move `worksheet-5.html` → `/worksheets/`
- [ ] Move `worksheet-6.html` → `/worksheets/`
- [ ] Move `worksheet-7.html` → `/worksheets/`
- [ ] Move `worksheet-8.html` → `/worksheets/`
- [ ] Move `worksheet-9.html` → `/worksheets/`
- [ ] Move `worksheet-10.html` → `/worksheets/`
- [ ] Move `worksheet-11.html` → `/worksheets/`
- [ ] Move `worksheet-12.html` → `/worksheets/`

### **Files to Update**:
- [ ] `CP6211-worksheets.html` - Update all 12 onclick navigation paths
- [ ] `worksheet-1.html` - Update next button path, update script src paths
- [ ] `worksheet-2.html` - Update prev/next button paths, update script src paths
- [ ] `worksheet-3.html` - Update prev/next button paths, update script src paths
- [ ] `worksheet-4.html` - Update prev/next button paths, update script src paths
- [ ] `worksheet-5.html` - Update prev/next button paths, update script src paths
- [ ] `worksheet-6.html` - Update prev/next button paths, update script src paths
- [ ] `worksheet-7.html` - Update prev/next button paths, update script src paths
- [ ] `worksheet-8.html` - Update prev/next button paths, update script src paths
- [ ] `worksheet-9.html` - Update prev/next button paths, update script src paths
- [ ] `worksheet-10.html` - Update prev/next button paths, update script src paths
- [ ] `worksheet-11.html` - Update prev/next button paths, update script src paths
- [ ] `worksheet-12.html` - Update prev button path, update script src paths
- [ ] `worksheet-core.js` - Update returnToWorksheetsPage path
- [ ] `service-worker.js` - Update worksheet cache paths (if cached)

### **Testing Required**:
- [ ] Test worksheet grid navigation from CP6211-worksheets.html
- [ ] Test prev/next navigation between worksheets
- [ ] Test "Return to Worksheets" functionality
- [ ] Test worksheet interactive features still work
- [ ] **Git commit**: "Phase 5: Move worksheet pages to dedicated folder"

### **Risk Level**: ⚠️ **MEDIUM** - Navigation updates needed

---

## **Phase 6: Core Pages Consolidation** 🔴 **HIGH RISK**

### **Objective**: Group main application pages
### **Target Structure**:
```
/pages/
  about.html
  CP6211-worksheets.html
  tracking-dashboard.html
```

### **Tasks Checklist**:
- [ ] Create `/pages/` directory
- [ ] Move `about.html` → `/pages/`
- [ ] Move `CP6211-worksheets.html` → `/pages/`
- [ ] Move `tracking-dashboard.html` → `/pages/`

### **Files to Update**:
- [ ] `shared-navigation.js` - Update all navigation onclick paths (4 pages)
- [ ] `index.html` - Update any links to moved pages
- [ ] `service-worker.js` - Update core assets cache paths
- [ ] `worksheet-core.js` - Update returnToWorksheetsPage path
- [ ] All worksheet files - Update "Return to Worksheets" paths
- [ ] Any internal page-to-page navigation links

### **Testing Required**:
- [ ] Test main navigation menu works from all pages
- [ ] Test homepage links to other pages
- [ ] Test PWA core page caching
- [ ] Test all inter-page navigation
- [ ] **Git commit**: "Phase 6: Move core pages to dedicated folder"

### **Risk Level**: 🔴 **HIGH** - Most complex navigation changes

---

## **Final Phase: Verification and Cleanup**

### **Objective**: Ensure everything works and clean up
### **Tasks Checklist**:
- [ ] Test complete application functionality
- [ ] Test PWA installation and offline mode
- [ ] Test all navigation paths
- [ ] Test worksheet interactive features
- [ ] Clear browser cache and test fresh load
- [ ] Update README.md with new structure
- [ ] Update CHANGELOG.md with reorganization notes
- [ ] **Final Git commit**: "Complete directory reorganization - new folder structure"

### **Final Root Structure Verification**:
```
/                    (Project root)
├── index.html       ✓ Entry point
├── manifest.json    ✓ PWA requirement
├── package.json     ✓ Node.js config  
├── package-lock.json ✓ Node.js deps
├── .gitignore       ✓ Git config
├── README.md        ✓ Project info
├── LICENSE          ✓ Legal
├── CHANGELOG.md     ✓ Project history
├── /src/            ✓ Source code
├── /pages/          ✓ Application pages
├── /worksheets/     ✓ Worksheet pages
├── /assets/         ✓ Static assets
├── /config/         ✓ Server configs
├── /dev-tools/      ✓ Development tools
├── /docs/           ✓ Documentation
├── /archived/       ✓ Backups (reviewed)
└── /.git/           ✓ Version control
```

---

## **🚨 Important Notes**

### **Before Starting**:
- [ ] Create backup branch: `git checkout -b cleanup-backup`
- [ ] Ensure current changes are committed
- [ ] Test current application works fully

### **During Implementation**:
- [ ] Work on one phase at a time
- [ ] Test thoroughly after each phase
- [ ] Commit after each successful phase
- [ ] If something breaks, troubleshoot before continuing

### **Emergency Rollback**:
- [ ] If major issues occur: `git checkout main`
- [ ] Review what went wrong
- [ ] Fix issues before continuing

### **Success Criteria**:
- [ ] All application functionality works
- [ ] PWA installs and works offline
- [ ] All navigation works correctly
- [ ] No broken links or missing files
- [ ] Cleaner, more maintainable structure

---

**Estimated Time**: 4-6 hours (spread across multiple sessions)
**Recommended Approach**: Complete 1-2 phases per session with testing between each phase.
