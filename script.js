// =========================================================
// PestSnap AI - Complete Current Version
// =========================================================


// =========================================================
// Inspection Data
// =========================================================

const inspection = {
    saved: false,
    clientName: "",
    siteLocation: "",
    auditorName: "",
    inspectionDate: "",
    startTime: "",
    findings: []
};


// =========================================================
// DOM Elements
// =========================================================

const clientNameInput =
    document.getElementById("clientName");

const siteLocationInput =
    document.getElementById("siteLocation");

const auditorNameInput =
    document.getElementById("auditorName");

const inspectionDateInput =
    document.getElementById("inspectionDate");

const inspectionStartTime =
    document.getElementById("inspectionStartTime");

const saveManualDetailsButton =
    document.getElementById("saveManualDetails");

const editManualDetailsButton =
    document.getElementById("editManualDetails");

const inspectionForm =
    document.getElementById("inspectionForm");

const savedInspectionDetails =
    document.getElementById("savedInspectionDetails");

const savedClientName =
    document.getElementById("savedClientName");

const savedSiteLocation =
    document.getElementById("savedSiteLocation");

const savedAuditorName =
    document.getElementById("savedAuditorName");

const savedInspectionDate =
    document.getElementById("savedInspectionDate");

const inspectionSectionStatus =
    document.getElementById("inspectionSectionStatus");

const photoSection =
    document.getElementById("photoSection");

const photoButton =
    document.getElementById("photoButton");

const photoInput =
    document.getElementById("photoInput");

const cameraInput =
    document.getElementById("cameraInput");

const photoSourceDialog =
    document.getElementById("photoSourceDialog");

const takePhotoButton =
    document.getElementById("takePhotoButton");

const chooseGalleryButton =
    document.getElementById("chooseGalleryButton");

const cancelPhotoSourceButton =
    document.getElementById("cancelPhotoSourceButton");

const photoPreviewContainer =
    document.getElementById("photoPreviewContainer");

const photoPreview =
    document.getElementById("photoPreview");

const replacePhotoButton =
    document.getElementById("replacePhotoButton");

const removePhotoButton =
    document.getElementById("removePhotoButton");

const photoSelectedMessage =
    document.getElementById("photoSelectedMessage");

const markSection =
    document.getElementById("markSection");

const annotationCanvas =
    document.getElementById("annotationCanvas");

const annotationContainer =
    document.getElementById("annotationContainer");

const undoAnnotationButton =
    document.getElementById("undoAnnotationButton");

const clearAnnotationButton =
    document.getElementById("clearAnnotationButton");

const donePhotoButton =
    document.getElementById("donePhotoButton");

const annotationStatus =
    document.getElementById("annotationStatus");

const markSectionStatus =
    document.getElementById("markSectionStatus");

const aiSection =
    document.getElementById("aiSection");

const reportSection =
    document.getElementById("reportSection");

const findingCount =
    document.getElementById("findingCount");

const inspectionStatus =
    document.getElementById("inspectionStatus");

const pestIssue =
    document.getElementById("pestIssue");

const findingInput =
    document.getElementById("finding");

const findingArea =
    document.getElementById("findingArea");

const observation =
    document.getElementById("observation");

const actionPlan =
    document.getElementById("actionPlan");

const responsibility =
    document.getElementById("responsibility");

const timeline =
    document.getElementById("timeline");

const findingStatus =
    document.getElementById("findingStatus");

const priorityInput =
    document.getElementById("priority");

const saveFindingButton =
    document.getElementById("saveFindingButton");

const findingSectionStatus =
    document.getElementById("findingSectionStatus");

const findingFormStatus =
    document.getElementById("findingFormStatus");

const resetInspectionButton =
    document.getElementById("resetInspectionButton");

const manualDetailsStatus =
    document.getElementById("manualDetailsStatus");

const appMessage =
    document.getElementById("appMessage");

const downloadExcelButton =
    document.getElementById("downloadExcelButton");

const downloadPdfButton =
    document.getElementById("downloadPdfButton");

let editingFindingNumber = null;
let cancelEditButton = null;

const customPestContainer =
    document.getElementById("customPestContainer");

const customPest =
    document.getElementById("customPest");

const customAreaContainer =
    document.getElementById("customAreaContainer");

const customArea =
    document.getElementById("customArea");

const customActionPlanContainer =
    document.getElementById("customActionPlanContainer");

const customActionPlan =
    document.getElementById("customActionPlan");

const customResponsibilityContainer =
    document.getElementById("customResponsibilityContainer");

const customResponsibility =
    document.getElementById("customResponsibility");


// =========================================================
// Combo Box Helpers & Listeners
// =========================================================

function setComboBoxValue(selectElement, containerElement, customInputElement, savedValue) {
    if (!selectElement) {
        return;
    }

    const valueStr = String(savedValue || "").trim();

    if (!valueStr) {
        selectElement.value = "";
        if (containerElement) {
            containerElement.hidden = true;
        }
        if (customInputElement) {
            customInputElement.value = "";
        }
        return;
    }

    const matchingOption = Array.from(selectElement.options).find(function (opt) {
        return opt.value && opt.value !== "Other" && opt.value.toLowerCase() === valueStr.toLowerCase();
    });

    if (matchingOption) {
        selectElement.value = matchingOption.value;
        if (containerElement) {
            containerElement.hidden = true;
        }
        if (customInputElement) {
            customInputElement.value = "";
        }
    } else {
        selectElement.value = "Other";
        if (containerElement) {
            containerElement.hidden = false;
        }
        if (customInputElement) {
            customInputElement.value = valueStr === "Other" ? "" : valueStr;
        }
    }
}

function setStatusValue(statusSelect, savedStatus) {
    if (!statusSelect) {
        return;
    }

    const statusStr = String(savedStatus || "Open").trim();

    const matchingOption = Array.from(statusSelect.options).find(function (opt) {
        return opt.value && opt.value.toLowerCase() === statusStr.toLowerCase();
    });

    if (matchingOption) {
        statusSelect.value = matchingOption.value;
    } else if (statusStr) {
        const option = document.createElement("option");
        option.value = statusStr;
        option.textContent = statusStr;
        statusSelect.appendChild(option);
        statusSelect.value = statusStr;
    } else {
        statusSelect.value = "Open";
    }
}

if (pestIssue) {
    pestIssue.addEventListener("change", function () {
        if (pestIssue.value === "Other") {
            if (customPestContainer) {
                customPestContainer.hidden = false;
            }
            if (customPest) {
                customPest.focus();
            }
        } else {
            if (customPestContainer) {
                customPestContainer.hidden = true;
            }
            if (customPest) {
                customPest.value = "";
            }
        }
    });
}

if (findingArea) {
    findingArea.addEventListener("change", function () {
        if (findingArea.value === "Other") {
            if (customAreaContainer) {
                customAreaContainer.hidden = false;
            }
            if (customArea) {
                customArea.focus();
            }
        } else {
            if (customAreaContainer) {
                customAreaContainer.hidden = true;
            }
            if (customArea) {
                customArea.value = "";
            }
        }
    });
}

if (actionPlan) {
    actionPlan.addEventListener("change", function () {
        if (actionPlan.value === "Other") {
            if (customActionPlanContainer) {
                customActionPlanContainer.hidden = false;
            }
            if (customActionPlan) {
                customActionPlan.focus();
            }
        } else {
            if (customActionPlanContainer) {
                customActionPlanContainer.hidden = true;
            }
            if (customActionPlan) {
                customActionPlan.value = "";
            }
        }
    });
}

if (responsibility) {
    responsibility.addEventListener("change", function () {
        if (responsibility.value === "Other") {
            if (customResponsibilityContainer) {
                customResponsibilityContainer.hidden = false;
            }
            if (customResponsibility) {
                customResponsibility.focus();
            }
        } else {
            if (customResponsibilityContainer) {
                customResponsibilityContainer.hidden = true;
            }
            if (customResponsibility) {
                customResponsibility.value = "";
            }
        }
    });
}


// =========================================================
// Utility Functions
// =========================================================

function getCurrentDate() {

    const now = new Date();

    const year =
        now.getFullYear();

    const month =
        String(now.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(now.getDate())
            .padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function getCurrentDateTime() {

    return new Date().toLocaleString();
}


function showAppMessage(message) {

    appMessage.textContent = message;
}


function updateInspectionSummary() {

    findingCount.textContent =
        inspection.findings.length;

    inspectionStatus.textContent =
        inspection.saved
            ? "Active"
            : "Not started";

    if (downloadPdfButton) {
        downloadPdfButton.disabled =
            inspection.findings.length === 0;
    }

    if (downloadExcelButton) {
        downloadExcelButton.disabled =
            inspection.findings.length === 0;
    }
}


function escapeHtml(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value || "";

    return div.innerHTML;
}


function calculateAgeingDays(startDate) {

    if (!startDate) {
        return 0;
    }

    const start =
        new Date(startDate);

    const today =
        new Date();

    const difference =
        today.getTime() -
        start.getTime();

    return Math.max(
        0,
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        )
    );
}


function clearFindingForm() {

    findingInput.value = "";
    pestIssue.value = "";
    if (customPestContainer) {
        customPestContainer.hidden = true;
    }
    if (customPest) {
        customPest.value = "";
    }

    findingArea.value = "";
    if (customAreaContainer) {
        customAreaContainer.hidden = true;
    }
    if (customArea) {
        customArea.value = "";
    }

    observation.value = "";

    actionPlan.value = "";
    if (customActionPlanContainer) {
        customActionPlanContainer.hidden = true;
    }
    if (customActionPlan) {
        customActionPlan.value = "";
    }

    responsibility.value = "";
    if (customResponsibilityContainer) {
        customResponsibilityContainer.hidden = true;
    }
    if (customResponsibility) {
        customResponsibility.value = "";
    }

    timeline.value = "";
    priorityInput.value = "";
    findingStatus.value = "Open";

    const photoNote =
        document.getElementById("photoNote");

    if (photoNote) {
        photoNote.value = "";
    }
}


function exitFindingEditMode() {

    editingFindingNumber =
        null;

    aiSection.hidden =
        true;

    saveFindingButton.textContent =
        "Save Finding";

    findingSectionStatus.textContent =
        "Draft";

    findingFormStatus.textContent =
        "";

    if (cancelEditButton) {
        cancelEditButton.remove();
        cancelEditButton = null;
    }

    clearFindingForm();
}


function enterFindingEditMode(finding) {

    editingFindingNumber =
        finding.findingNumber;

    findingInput.value =
        finding.finding || "";

    setComboBoxValue(
        pestIssue,
        customPestContainer,
        customPest,
        finding.pestIssue
    );

    setComboBoxValue(
        findingArea,
        customAreaContainer,
        customArea,
        finding.area
    );

    observation.value =
        finding.observation || "";

    setComboBoxValue(
        actionPlan,
        customActionPlanContainer,
        customActionPlan,
        finding.actionPlan
    );

    timeline.value =
        finding.timeline || "";

    setComboBoxValue(
        responsibility,
        customResponsibilityContainer,
        customResponsibility,
        finding.responsibility
    );

    priorityInput.value =
        finding.priority || "";

    setStatusValue(
        findingStatus,
        finding.status
    );

    const photoNote =
        document.getElementById("photoNote");

    if (photoNote) {
        photoNote.value =
            finding.photoNote || "";
    }

    saveFindingButton.textContent =
        "Save Changes";

    findingSectionStatus.textContent =
        "Editing";

    findingFormStatus.textContent =
        `Editing Finding ${finding.findingNumber}`;

    if (!cancelEditButton) {
        cancelEditButton =
            document.createElement("button");

        cancelEditButton.type =
            "button";

        cancelEditButton.className =
            "btn btn-secondary";

        cancelEditButton.textContent =
            "Cancel Edit";

        cancelEditButton.setAttribute(
            "aria-label",
            "Cancel finding edit"
        );

        cancelEditButton.addEventListener(
            "click",
            function () {
                exitFindingEditMode();
            }
        );

        saveFindingButton.parentElement.appendChild(
            cancelEditButton
        );
    }

    aiSection.hidden =
        false;

    aiSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    pestIssue.focus();
}


function saveInspectionToStorage() {

    try {
        localStorage.setItem(
            "pestsnapInspection",
            JSON.stringify(inspection)
        );
    } catch (error) {
        console.error(
            "Unable to save PestSnap inspection:",
            error
        );
    }
}


function loadInspectionFromStorage() {

    try {
        const storedInspection =
            localStorage.getItem("pestsnapInspection");

        if (!storedInspection) {
            updateInspectionSummary();
            showAppMessage(
                "Enter the inspection details to begin."
            );
            return;
        }

        const savedInspection =
            JSON.parse(storedInspection);

        if (
            !savedInspection ||
            typeof savedInspection !== "object" ||
            !Array.isArray(savedInspection.findings)
        ) {
            throw new Error("Saved inspection data is invalid.");
        }

        inspection.saved =
            Boolean(savedInspection.saved);

        inspection.clientName =
            String(savedInspection.clientName || "");

        inspection.siteLocation =
            String(savedInspection.siteLocation || "");

        inspection.auditorName =
            String(savedInspection.auditorName || "");

        inspection.inspectionDate =
            String(savedInspection.inspectionDate || getCurrentDate());

        inspection.startTime =
            String(savedInspection.startTime || "");

        inspection.findings =
            savedInspection.findings;

        clientNameInput.value =
            inspection.clientName;

        siteLocationInput.value =
            inspection.siteLocation;

        auditorNameInput.value =
            inspection.auditorName;

        inspectionDateInput.value =
            inspection.inspectionDate;

        savedClientName.textContent =
            inspection.clientName;

        savedSiteLocation.textContent =
            inspection.siteLocation;

        savedAuditorName.textContent =
            inspection.auditorName;

        savedInspectionDate.textContent =
            inspection.inspectionDate;

        inspectionStartTime.textContent =
            inspection.startTime || "Not started";

        inspectionForm.hidden =
            inspection.saved;

        savedInspectionDetails.hidden =
            !inspection.saved;

        inspectionSectionStatus.textContent =
            inspection.saved ? "Saved" : "Not saved";

        photoSection.hidden =
            !inspection.saved;

        resetInspectionButton.hidden =
            !inspection.saved;

        markSection.hidden =
            true;

        aiSection.hidden =
            true;

        reportSection.hidden =
            inspection.findings.length === 0;

        renderSavedFindings();
        updateInspectionSummary();

        showAppMessage(
            "Your saved inspection was restored. Please add the photo for the next finding."
        );
    } catch (error) {
        console.error(
            "Unable to restore PestSnap inspection:",
            error
        );

        localStorage.removeItem("pestsnapInspection");

        updateInspectionSummary();
        showAppMessage(
            "Enter the inspection details to begin."
        );
    }
}


// =========================================================
// Initial Date
// =========================================================

inspectionDateInput.value =
    getCurrentDate();


// =========================================================
// Save Manual Inspection Details
// =========================================================

saveManualDetailsButton.addEventListener(
    "click",
    function () {

        const clientName =
            clientNameInput.value.trim();

        const siteLocation =
            siteLocationInput.value.trim();

        const auditorName =
            auditorNameInput.value.trim();

        const inspectionDate =
            inspectionDateInput.value;


        if (!clientName) {

            showAppMessage(
                "Please enter the client name."
            );

            clientNameInput.focus();

            return;
        }


        if (!siteLocation) {

            showAppMessage(
                "Please enter the site or location."
            );

            siteLocationInput.focus();

            return;
        }


        if (!auditorName) {

            showAppMessage(
                "Please enter the auditor name."
            );

            auditorNameInput.focus();

            return;
        }


        if (!inspectionDate) {

            showAppMessage(
                "Please select the inspection date."
            );

            inspectionDateInput.focus();

            return;
        }


        inspection.clientName =
            clientName;

        inspection.siteLocation =
            siteLocation;

        inspection.auditorName =
            auditorName;

        inspection.inspectionDate =
            inspectionDate;

        // Record the inspection start time once, when the inspection
        // details are successfully saved. Do not overwrite it later.
        if (!inspection.startTime) {
            inspection.startTime = getCurrentDateTime();
        }

        inspection.saved = true;

        inspectionStartTime.textContent =
            inspection.startTime;

        savedClientName.textContent =
            inspection.clientName;

        savedSiteLocation.textContent =
            inspection.siteLocation;

        savedAuditorName.textContent =
            inspection.auditorName;

        savedInspectionDate.textContent =
            inspection.inspectionDate;

        saveInspectionToStorage();

        inspectionForm.hidden = true;

        savedInspectionDetails.hidden =
            false;

        inspectionSectionStatus.textContent =
            "Saved";

        manualDetailsStatus.textContent =
            "Inspection details saved successfully.";

        photoSection.hidden = false;

        resetInspectionButton.hidden = false;


        showAppMessage(
            "Inspection saved. Add your first photo."
        );


        updateInspectionSummary();

        photoButton.focus();
    }
);


// =========================================================
// Edit Manual Details
// =========================================================

editManualDetailsButton.addEventListener(
    "click",
    function () {

        inspectionForm.hidden =
            false;

        savedInspectionDetails.hidden =
            true;

        inspectionSectionStatus.textContent =
            "Editing";

        showAppMessage(
            "Edit the manual details and save again."
        );

        clientNameInput.focus();
    }
);


// =========================================================
// Photo Button
// =========================================================

function openPhotoSourceDialog() {

    if (typeof photoSourceDialog.showModal === "function") {
        photoSourceDialog.showModal();
        return;
    }

    photoInput.click();
}


photoButton.addEventListener(
    "click",
    function () {

        openPhotoSourceDialog();
    }
);


// =========================================================
// Replace Photo
// =========================================================

replacePhotoButton.addEventListener(
    "click",
    function () {

        openPhotoSourceDialog();
    }
);


takePhotoButton.addEventListener(
    "click",
    function () {

        photoSourceDialog.close();
        cameraInput.click();
    }
);


chooseGalleryButton.addEventListener(
    "click",
    function () {

        photoSourceDialog.close();
        photoInput.click();
    }
);


cancelPhotoSourceButton.addEventListener(
    "click",
    function () {

        photoSourceDialog.close();
    }
);


// =========================================================
// Remove Photo
// =========================================================

removePhotoButton.addEventListener(
    "click",
    function () {

        const confirmed =
            window.confirm(
                "Remove this photo and start again?"
            );


        if (!confirmed) {
            return;
        }


        photoInput.value = "";

        photoPreview.onload = null;
        photoPreview.onerror = null;

        photoPreview.src = "";

        photoPreviewContainer.hidden =
            true;


        if (annotationCanvas) {

            const context =
                annotationCanvas.getContext("2d");

            context.clearRect(
                0,
                0,
                annotationCanvas.width,
                annotationCanvas.height
            );
        }


        annotationImage = null;

        annotationHistory = [];

        hasAnnotation = false;

        isDrawing = false;


        undoAnnotationButton.disabled =
            true;

        clearAnnotationButton.disabled =
            true;


        markSection.hidden =
            true;

        aiSection.hidden =
            true;


        reportSection.hidden =
            inspection.findings.length === 0;


        const photoNote =
            document.getElementById(
                "photoNote"
            );


        if (photoNote) {

            photoNote.value = "";
        }


        photoSelectedMessage.textContent =
            "";

        annotationStatus.textContent =
            "";

        markSectionStatus.textContent =
            "Ready";


        showAppMessage(
            "Photo removed. You can select another photo."
        );


        photoButton.focus();
    }
);


// =========================================================
// Reset Inspection
// =========================================================

resetInspectionButton.addEventListener(
    "click",
    function () {

        const confirmed =
            window.confirm(
                "Are you sure you want to reset this inspection? All current data will be cleared."
            );


        if (!confirmed) {
            return;
        }


        inspection.saved = false;

        inspection.clientName = "";

        inspection.siteLocation = "";

        inspection.auditorName = "";

        inspection.inspectionDate =
            getCurrentDate();

        inspection.startTime = "";

        inspection.findings = [];

        localStorage.removeItem(
            "pestsnapInspection"
        );


        clientNameInput.value = "";

        siteLocationInput.value = "";

        auditorNameInput.value = "";

        inspectionDateInput.value =
            inspection.inspectionDate;

        photoInput.value = "";


        photoPreview.onload = null;
        photoPreview.onerror = null;

        photoPreview.src = "";


        annotationImage = null;

        annotationHistory = [];

        hasAnnotation = false;


        annotationCanvas.width = 0;

        annotationCanvas.height = 0;


        photoSection.hidden =
            true;

        markSection.hidden =
            true;

        aiSection.hidden =
            true;

        reportSection.hidden =
            true;

        photoPreviewContainer.hidden =
            true;


        inspectionForm.hidden =
            false;

        savedInspectionDetails.hidden =
            true;

        resetInspectionButton.hidden =
            true;


        inspectionSectionStatus.textContent =
            "Not saved";

        inspectionStartTime.textContent =
            "Not started";

        manualDetailsStatus.textContent =
            "";

        photoSelectedMessage.textContent =
            "";


        showAppMessage(
            "Inspection has been reset."
        );


        updateInspectionSummary();

        clientNameInput.focus();
    }
);


// =========================================================
// Restore Saved Inspection
// =========================================================

loadInspectionFromStorage();


// =========================================================
// Module 2 - Photo Annotation
// =========================================================

const annotationContext =
    annotationCanvas.getContext("2d");

let annotationHistory = [];

let isDrawing = false;

let hasAnnotation = false;

let annotationImage = null;


function getCanvasPosition(event) {

    const rect =
        annotationCanvas.getBoundingClientRect();

    const scaleX =
        annotationCanvas.width /
        rect.width;

    const scaleY =
        annotationCanvas.height /
        rect.height;


    return {

        x:
            (event.clientX - rect.left)
            * scaleX,

        y:
            (event.clientY - rect.top)
            * scaleY
    };
}


function saveAnnotationState() {

    annotationHistory.push(
        annotationContext.getImageData(
            0,
            0,
            annotationCanvas.width,
            annotationCanvas.height
        )
    );


    if (annotationHistory.length > 20) {

        annotationHistory.shift();
    }


    undoAnnotationButton.disabled =
        annotationHistory.length === 0;
}


// =========================================================
// Start Drawing
// =========================================================

annotationCanvas.addEventListener(
    "pointerdown",
    function (event) {

        if (!annotationImage) {
            return;
        }


        isDrawing = true;

        annotationCanvas.setPointerCapture(
            event.pointerId
        );


        saveAnnotationState();


        const position =
            getCanvasPosition(event);


        annotationContext.beginPath();

        annotationContext.moveTo(
            position.x,
            position.y
        );


        annotationStatus.textContent =
            "Drawing started.";
    }
);


// =========================================================
// Drawing
// =========================================================

annotationCanvas.addEventListener(
    "pointermove",
    function (event) {

        if (!isDrawing) {
            return;
        }


        const position =
            getCanvasPosition(event);


        annotationContext.lineTo(
            position.x,
            position.y
        );

        annotationContext.stroke();


        hasAnnotation = true;

        clearAnnotationButton.disabled =
            false;
    }
);


// =========================================================
// Finish Drawing
// =========================================================

annotationCanvas.addEventListener(
    "pointerup",
    function () {

        if (!isDrawing) {
            return;
        }


        isDrawing = false;

        annotationContext.closePath();


        annotationStatus.textContent =
            "Problem area marked.";
    }
);


// =========================================================
// Cancel Drawing
// =========================================================

annotationCanvas.addEventListener(
    "pointercancel",
    function () {

        isDrawing = false;

        annotationContext.closePath();
    }
);


// =========================================================
// Undo Annotation
// =========================================================

undoAnnotationButton.addEventListener(
    "click",
    function () {

        if (annotationHistory.length === 0) {
            return;
        }


        const previousState =
            annotationHistory.pop();


        annotationContext.putImageData(
            previousState,
            0,
            0
        );


        undoAnnotationButton.disabled =
            annotationHistory.length === 0;


        annotationStatus.textContent =
            "Last marking removed.";
    }
);


// =========================================================
// Clear Annotation
// =========================================================

clearAnnotationButton.addEventListener(
    "click",
    function () {

        if (!annotationImage) {
            return;
        }


        annotationContext.clearRect(
            0,
            0,
            annotationCanvas.width,
            annotationCanvas.height
        );


        annotationContext.drawImage(
            annotationImage,
            0,
            0,
            annotationCanvas.width,
            annotationCanvas.height
        );


        annotationHistory = [];

        hasAnnotation = false;


        undoAnnotationButton.disabled =
            true;

        clearAnnotationButton.disabled =
            true;


        annotationStatus.textContent =
            "All markings cleared.";
    }
);


// =========================================================
// Prepare Annotation Canvas
// =========================================================

function prepareAnnotationCanvas(image) {

    annotationImage = image;


    const maxWidth = 1600;

    let width =
        image.naturalWidth;

    let height =
        image.naturalHeight;


    if (width > maxWidth) {

        const ratio =
            maxWidth / width;

        width =
            Math.round(
                width * ratio
            );

        height =
            Math.round(
                height * ratio
            );
    }


    annotationCanvas.width =
        width;

    annotationCanvas.height =
        height;


    annotationContext.clearRect(
        0,
        0,
        width,
        height
    );


    annotationContext.drawImage(
        image,
        0,
        0,
        width,
        height
    );


    annotationContext.lineWidth =
        Math.max(
            6,
            width / 180
        );


    annotationContext.lineCap =
        "round";

    annotationContext.lineJoin =
        "round";

    annotationContext.strokeStyle =
        "#ff0000";


    annotationHistory = [];

    hasAnnotation = false;


    undoAnnotationButton.disabled =
        true;

    clearAnnotationButton.disabled =
        true;
}


// =========================================================
// Photo Upload
// =========================================================

function processPhotoFile(file, sourceInput) {


    if (!file) {
        return;
    }


    if (!file.type.startsWith("image/")) {

        showAppMessage(
            "Please select a PNG, JPG, JPEG, or WEBP image."
        );

        sourceInput.value = "";

        return;
    }


        const imageURL =
            URL.createObjectURL(file);


        photoPreview.onload =
            function () {

                prepareAnnotationCanvas(
                    photoPreview
                );


                photoPreviewContainer.hidden =
                    false;


                photoSelectedMessage.textContent =
                    "Photo loaded successfully.";


                markSection.hidden =
                    false;


                markSectionStatus.textContent =
                    "Ready";


                annotationStatus.textContent =
                    "Photo loaded. You can mark the problem area.";


                showAppMessage(
                    "Photo loaded successfully."
                );


                markSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                URL.revokeObjectURL(
                    imageURL
                );
            };


        photoPreview.onerror =
            function () {

                URL.revokeObjectURL(
                    imageURL
                );


                photoPreview.onload =
                    null;

                photoPreview.onerror =
                    null;


                photoPreview.src =
                    "";


                sourceInput.value =
                    "";


                photoPreviewContainer.hidden =
                    true;


                markSection.hidden =
                    true;


                showAppMessage(
                    "Unable to load the selected image. Please choose another image."
                );
            };


    photoPreview.src =
        imageURL;
}


photoInput.addEventListener(
    "change",
    function () {

        processPhotoFile(
            photoInput.files[0],
            photoInput
        );
    }
);


cameraInput.addEventListener(
    "change",
    function () {

        processPhotoFile(
            cameraInput.files[0],
            cameraInput
        );
    }
);


// =========================================================
// Done Photo
// =========================================================

donePhotoButton.addEventListener(
    "click",
    function () {

        if (!annotationImage) {

            showAppMessage(
                "Please select a photo first."
            );

            return;
        }


        markSectionStatus.textContent =
            "Completed";


        annotationStatus.textContent =
            hasAnnotation
                ? "Photo marking completed."
                : "No marking added.";


        aiSection.hidden =
            false;


        showAppMessage(
            "Photo marking completed. Ready for finding details."
        );


        aiSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
);


// =========================================================
// Module 3 - Save Finding
// =========================================================

saveFindingButton.addEventListener(
    "click",
    function () {

        if (!findingInput.value.trim()) {

            showAppMessage(
                "Please enter the finding."
            );

            findingInput.focus();

            return;
        }


        if (!pestIssue.value) {

            showAppMessage(
                "Please select the pest."
            );

            pestIssue.focus();

            return;
        }


        if (pestIssue.value === "Other" && (!customPest || !customPest.value.trim())) {

            showAppMessage(
                "Please enter the custom pest name."
            );

            if (customPest) {
                customPest.focus();
            }

            return;
        }


        if (!findingArea.value) {

            showAppMessage(
                "Please select the area."
            );

            findingArea.focus();

            return;
        }


        if (findingArea.value === "Other" && (!customArea || !customArea.value.trim())) {

            showAppMessage(
                "Please enter the custom area name."
            );

            if (customArea) {
                customArea.focus();
            }

            return;
        }


        if (!observation.value.trim()) {

            showAppMessage(
                "Please enter the observation."
            );

            observation.focus();

            return;
        }


        if (!actionPlan.value) {

            showAppMessage(
                "Please select an action plan."
            );

            actionPlan.focus();

            return;
        }


        if (actionPlan.value === "Other" && (!customActionPlan || !customActionPlan.value.trim())) {

            showAppMessage(
                "Please enter the custom action plan."
            );

            if (customActionPlan) {
                customActionPlan.focus();
            }

            return;
        }


        if (!timeline.value) {

            showAppMessage(
                "Please select the timeline."
            );

            timeline.focus();

            return;
        }


        if (!responsibility.value) {

            showAppMessage(
                "Please select the responsibility."
            );

            responsibility.focus();

            return;
        }


        if (responsibility.value === "Other" && (!customResponsibility || !customResponsibility.value.trim())) {

            showAppMessage(
                "Please enter the custom responsibility."
            );

            if (customResponsibility) {
                customResponsibility.focus();
            }

            return;
        }


        if (!priorityInput.value) {

            showAppMessage(
                "Please select the priority."
            );

            priorityInput.focus();

            return;
        }


        if (!findingStatus.value) {

            showAppMessage(
                "Please select the status."
            );

            findingStatus.focus();

            return;
        }


        const resolvedPest =
            pestIssue.value === "Other"
                ? (customPest ? customPest.value.trim() : "")
                : pestIssue.value.trim();

        const resolvedArea =
            findingArea.value === "Other"
                ? (customArea ? customArea.value.trim() : "")
                : findingArea.value.trim();

        const resolvedActionPlan =
            actionPlan.value === "Other"
                ? (customActionPlan ? customActionPlan.value.trim() : "")
                : actionPlan.value.trim();

        const resolvedResponsibility =
            responsibility.value === "Other"
                ? (customResponsibility ? customResponsibility.value.trim() : "")
                : responsibility.value.trim();


        if (editingFindingNumber !== null) {

            const finding =
                inspection.findings.find(
                    function (savedFinding) {
                        return savedFinding.findingNumber ===
                            editingFindingNumber;
                    }
                );

            if (!finding) {
                exitFindingEditMode();
                showAppMessage(
                    "The finding could not be found."
                );
                return;
            }

            finding.finding =
                findingInput.value.trim();

            finding.pestIssue =
                resolvedPest;

            finding.area =
                resolvedArea;

            finding.observation =
                observation.value.trim();

            finding.actionPlan =
                resolvedActionPlan;

            finding.timeline =
                timeline.value;

            finding.responsibility =
                resolvedResponsibility;

            finding.priority =
                priorityInput.value;

            finding.status =
                findingStatus.value;

            finding.photoNote =
                document
                    .getElementById("photoNote")
                    .value
                    .trim();

            console.log(
                "Remarks input:",
                document.getElementById("photoNote")?.value
            );

            console.log(
                "Saved finding photoNote:",
                finding.photoNote
            );

            saveInspectionToStorage();

            const updatedFindingNumber =
                editingFindingNumber;

            exitFindingEditMode();
            renderSavedFindings();
            updateInspectionSummary();

            showAppMessage(
                `Finding ${updatedFindingNumber} updated successfully.`
            );

            reportSection.hidden =
                false;

            return;
        }


        const finding = {

            findingNumber:
                inspection.findings.length + 1,

            auditDate:
                inspection.inspectionDate,

            finding:
                findingInput.value.trim(),

            pestIssue:
                resolvedPest,

            area:
                resolvedArea,

            observation:
                observation.value.trim(),

            actionPlan:
                resolvedActionPlan,

            timeline:
                timeline.value,

            responsibility:
                resolvedResponsibility,

            priority:
                priorityInput.value,

            status:
                findingStatus.value,

            photoNote:
                document
                    .getElementById(
                        "photoNote"
                    )
                    .value
                    .trim(),

            markedPhoto:
                annotationCanvas.toDataURL(
                    "image/jpeg",
                    0.85
                ),

            createdAt:
                new Date().toLocaleString()
        };

        console.log(
            "Remarks input:",
            document.getElementById("photoNote")?.value
        );

        console.log(
            "Saved finding photoNote:",
            finding.photoNote
        );


        inspection.findings.push(
            finding
        );

        saveInspectionToStorage();

        console.log(
            "Stored remarks:",
            inspection.findings[
                inspection.findings.length - 1
            ].photoNote
        );


        aiSection
            .querySelectorAll(
                "input, textarea, select, button"
            )
            .forEach(
                function (element) {

                    element.disabled =
                        true;
                }
            );


        findingSectionStatus.textContent =
            "Saved";


        findingFormStatus.textContent =
            `Finding #${finding.findingNumber} saved successfully.`;


        showAppMessage(
            `Finding #${finding.findingNumber} saved.`
        );


        updateInspectionSummary();


        addFindingToList(
            finding
        );


        prepareNextFinding();
    }
);


// =========================================================
// Display Saved Finding
// =========================================================

function addFindingToList(finding) {

    const savedFindingsContainer =
        document.getElementById(
            "savedFindingsContainer"
        );


    if (
        savedFindingsContainer.textContent
            .includes(
                "No findings saved yet."
            )
    ) {

        savedFindingsContainer.innerHTML =
            "";
    }


    const findingElement =
        document.createElement("div");


    findingElement.className =
        "finding-item";


    // Header

    const header =
        document.createElement("div");


    header.className =
        "finding-item-header";


    const title =
        document.createElement("strong");


    title.textContent =
        `Finding #${finding.findingNumber} — ${finding.pestIssue}`;


    const deleteButton =
        document.createElement("button");

    const editButton =
        document.createElement("button");

    editButton.type =
        "button";

    editButton.className =
        "finding-edit-button";

    editButton.textContent =
        "Edit";

    editButton.setAttribute(
        "aria-label",
        `Edit Finding ${finding.findingNumber}`
    );


    deleteButton.type =
        "button";


    deleteButton.className =
        "finding-delete-button";


    deleteButton.textContent =
        "Delete";


    deleteButton.setAttribute(
        "aria-label",
        `Delete Finding ${finding.findingNumber}`
    );


    const actionButtons =
        document.createElement("div");

    actionButtons.className =
        "finding-item-actions";

    actionButtons.appendChild(editButton);

    header.appendChild(title);

    actionButtons.appendChild(deleteButton);

    header.appendChild(actionButtons);


    findingElement.appendChild(
        header
    );


    // Marked Photo

    if (finding.markedPhoto) {

        const photoTitle =
            document.createElement("strong");


        photoTitle.textContent =
            "Marked Photo";


        photoTitle.className =
            "finding-photo-title";


        const photo =
            document.createElement("img");


        photo.src =
            finding.markedPhoto;


        photo.alt =
            `Marked photo for Finding ${finding.findingNumber}`;


        photo.className =
            "finding-marked-photo";


        findingElement.appendChild(
            photoTitle
        );


        findingElement.appendChild(
            photo
        );
    }


    // Details

    const details =
        document.createElement("div");


    details.className =
        "finding-details";


    details.innerHTML = `

        <p>
            <strong>Finding:</strong>
            ${escapeHtml(finding.finding || "")}
        </p>

        <p>
            <strong>Pest:</strong>
            ${escapeHtml(finding.pestIssue || "")}
        </p>

        <p>
            <strong>Area:</strong>
            ${escapeHtml(finding.area || "")}
        </p>

        <p>
            <strong>Observation:</strong>
            ${escapeHtml(finding.observation || "")}
        </p>

        <p>
            <strong>Action Plan:</strong>
            ${escapeHtml(finding.actionPlan || "")}
        </p>

        <p>
            <strong>Timeline:</strong>
            ${escapeHtml(finding.timeline || "")}
        </p>

        <p>
            <strong>Responsibility:</strong>
            ${escapeHtml(finding.responsibility || "")}
        </p>

        <p>
            <strong>Priority:</strong>
            ${escapeHtml(finding.priority || "")}
        </p>

        <p>
            <strong>Status:</strong>
            ${escapeHtml(finding.status || "")}
        </p>

        <p>
            <strong>Remarks:</strong>
            ${escapeHtml(finding.photoNote || "")}
        </p>
    `;


    findingElement.appendChild(
        details
    );


    editButton.addEventListener(
        "click",
        function () {
            enterFindingEditMode(finding);
        }
    );


    // Delete

    deleteButton.addEventListener(
        "click",
        function () {

            if (
                editingFindingNumber ===
                finding.findingNumber
            ) {
                exitFindingEditMode();
            }

            const confirmed =
                window.confirm(
                    `Delete Finding #${finding.findingNumber}?`
                );


            if (!confirmed) {
                return;
            }


            const index =
                inspection.findings.indexOf(
                    finding
                );


            if (index !== -1) {

                inspection.findings.splice(
                    index,
                    1
                );

                saveInspectionToStorage();
            }


            renderSavedFindings();


            updateInspectionSummary();


            showAppMessage(
                `Finding ${finding.findingNumber} deleted.`
            );
        }
    );


    savedFindingsContainer.appendChild(
        findingElement
    );
}


// =========================================================
// Re-render Findings
// =========================================================

function renderSavedFindings() {

    const container =
        document.getElementById(
            "savedFindingsContainer"
        );


    container.innerHTML =
        "";


    if (
        inspection.findings.length === 0
    ) {

        container.innerHTML =
            "<p>No findings saved yet.</p>";

        return;
    }


    inspection.findings.forEach(
        function (finding) {

            addFindingToList(
                finding
            );
        }
    );
}


// =========================================================
// Prepare Next Finding
// =========================================================

function prepareNextFinding() {

    aiSection.hidden =
        true;


    photoInput.value =
        "";


    // Remove handlers BEFORE clearing src
    photoPreview.onload =
        null;

    photoPreview.onerror =
        null;


    photoPreview.src =
        "";


    photoPreviewContainer.hidden =
        true;


    annotationImage =
        null;

    annotationHistory =
        [];

    hasAnnotation =
        false;

    isDrawing =
        false;


    annotationContext.clearRect(
        0,
        0,
        annotationCanvas.width,
        annotationCanvas.height
    );


    undoAnnotationButton.disabled =
        true;

    clearAnnotationButton.disabled =
        true;


    markSection.hidden =
        true;


    const photoNote =
        document.getElementById(
            "photoNote"
        );


    if (photoNote) {

        photoNote.value =
            "";
    }


    photoSelectedMessage.textContent =
        "";

    annotationStatus.textContent =
        "";

    markSectionStatus.textContent =
        "Ready";


    // Enable finding form again

    aiSection
        .querySelectorAll(
            "input, textarea, select, button"
        )
        .forEach(
            function (element) {

                element.disabled =
                    false;
            }
        );


    // Clear form

    pestIssue.value =
        "";

    if (customPestContainer) {
        customPestContainer.hidden = true;
    }

    if (customPest) {
        customPest.value = "";
    }

    findingInput.value =
        "";

    findingArea.value =
        "";

    if (customAreaContainer) {
        customAreaContainer.hidden = true;
    }

    if (customArea) {
        customArea.value = "";
    }

    observation.value =
        "";

    actionPlan.value =
        "";

    if (customActionPlanContainer) {
        customActionPlanContainer.hidden = true;
    }

    if (customActionPlan) {
        customActionPlan.value = "";
    }

    responsibility.value =
        "";

    if (customResponsibilityContainer) {
        customResponsibilityContainer.hidden = true;
    }

    if (customResponsibility) {
        customResponsibility.value = "";
    }

    timeline.value =
        "";

    findingStatus.value =
        "Open";

    priorityInput.value =
        "";


    findingSectionStatus.textContent =
        "Draft";

    findingFormStatus.textContent =
        "";


    reportSection.hidden =
        false;


    const photoHeading =
        document.getElementById(
            "photoHeading"
        );


    if (photoHeading) {

        photoHeading.textContent =
            `2. Add Finding Photo #${inspection.findings.length + 1}`;
    }


    showAppMessage(
        `Finding #${inspection.findings.length} saved. Ready for the next photo.`
    );


    photoSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    photoButton.focus();
}


// =========================================================
// PDF Report
// =========================================================

if (downloadPdfButton) {
    downloadPdfButton.addEventListener(
        "click",
        generatePdfReport
    );
}

function sanitizeFilename(value) {
    return String(value || "Inspection")
        .replace(/[\\/:*?"<>|]/g, "_")
        .trim()
        .replace(/[. ]+$/g, "") || "Inspection";
}

function loadExternalScript(src, globalCheck, timeoutMs = 15000) {
    return new Promise(function (resolve, reject) {
        if (globalCheck()) {
            resolve();
            return;
        }

        const existing = document.querySelector(
            `script[data-pestsnap-src="${src}"]`
        );

        if (existing) {
            const started = Date.now();
            const timer = setInterval(function () {
                if (globalCheck()) {
                    clearInterval(timer);
                    resolve();
                } else if (Date.now() - started > timeoutMs) {
                    clearInterval(timer);
                    reject(new Error(`Timed out loading ${src}`));
                }
            }, 50);
            return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.dataset.pestsnapSrc = src;

        script.onload = function () {
            if (globalCheck()) {
                resolve();
            } else {
                reject(new Error(`Loaded ${src}, but the required library was not found.`));
            }
        };

        script.onerror = function () {
            reject(new Error(`Unable to load ${src}`));
        };

        document.head.appendChild(script);
    });
}

async function ensureJsPdfLoaded() {
    // Load jsPDF automatically so PDF generation does not depend on
    // the user remembering to add another CDN script to index.html.
    await loadExternalScript(
        "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",
        function () {
            return !!(
                window.jspdf &&
                window.jspdf.jsPDF
            );
        }
    );

    return window.jspdf.jsPDF;
}

function getPdfImageFormat(dataUrl) {
    return String(dataUrl || "")
        .toLowerCase()
        .startsWith("data:image/png")
        ? "PNG"
        : "JPEG";
}

function splitPdfText(doc, text, maxWidth) {
    const value = String(text == null ? "" : text);
    if (!value) {
        return [""];
    }

    return doc.splitTextToSize(value, maxWidth);
}

function addPdfTextBlock(doc, label, value, currentY, options = {}) {
    const left = options.left || 15;
    const labelWidth = options.labelWidth || 48;
    const valueWidth = options.valueWidth || 132;
    const fontSize = options.fontSize || 9;
    const lineHeight = options.lineHeight || 4.5;
    const padding = options.padding || 2.5;

    const lines = splitPdfText(
        doc,
        value == null || value === "" ? "" : value,
        valueWidth - padding * 2
    );

    const rowHeight = Math.max(
        9,
        lines.length * lineHeight + padding * 2
    );

    const pageHeight = doc.internal.pageSize.getHeight();
    if (currentY + rowHeight > pageHeight - 15) {
        doc.addPage();
        currentY = 15;
    }

    doc.setDrawColor(190, 190, 190);
    doc.setLineWidth(0.2);
    doc.rect(left, currentY, labelWidth, rowHeight);
    doc.rect(left + labelWidth, currentY, valueWidth, rowHeight);

    doc.setFontSize(fontSize);
    doc.setFont(undefined, "bold");
    doc.text(String(label), left + padding, currentY + 6);

    doc.setFont(undefined, "normal");
    if (lines.length) {
        doc.text(
            lines,
            left + labelWidth + padding,
            currentY + 6,
            {
                baseline: "alphabetic"
            }
        );
    }

    return currentY + rowHeight;
}

function addPdfSectionHeading(doc, text, currentY) {
    const pageHeight = doc.internal.pageSize.getHeight();
    if (currentY + 12 > pageHeight - 15) {
        doc.addPage();
        currentY = 15;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text(String(text), 15, currentY + 7);
    return currentY + 12;
}

function addPdfMarkedPhoto(doc, dataUrl, currentY) {
    const pageHeight = doc.internal.pageSize.getHeight();
    const bottomMargin = 15;
    const maxWidth = 170;
    const maxHeight = 90;

    let imageWidth = maxWidth;
    let imageHeight = maxHeight;

    try {
        const properties = doc.getImageProperties(dataUrl);
        const ratio =
            properties.width / properties.height;

        if (ratio > 0) {
            imageWidth = Math.min(
                maxWidth,
                maxHeight * ratio
            );
            imageHeight = imageWidth / ratio;

            if (imageHeight > maxHeight) {
                imageHeight = maxHeight;
                imageWidth = imageHeight * ratio;
            }
        }
    } catch (error) {
        console.warn(
            "Unable to read marked photo dimensions:",
            error
        );
    }

    if (currentY + imageHeight > pageHeight - bottomMargin) {
        doc.addPage();
        currentY = 15;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.text("Marked Photo", 15, currentY + 5);

    currentY += 9;

    if (currentY + imageHeight > pageHeight - bottomMargin) {
        doc.addPage();
        currentY = 15;
    }

    doc.addImage(
        dataUrl,
        getPdfImageFormat(dataUrl),
        15,
        currentY,
        imageWidth,
        imageHeight
    );

    return currentY + imageHeight + 10;
}

async function generatePdfReport() {
    if (inspection.findings.length === 0) {
        showAppMessage("No findings available for PDF.");
        return;
    }

    try {
        if (downloadPdfButton) {
            downloadPdfButton.disabled = true;
        }

        showAppMessage("Preparing PDF report...");

        const jsPDF = await ensureJsPdfLoaded();

        const doc = new jsPDF({
            unit: "mm",
            format: "a4"
        });

        let currentY = 18;

        // -----------------------------------------------------
        // Inspection Summary
        // -----------------------------------------------------
        doc.setFontSize(16);
        doc.setFont(undefined, "bold");
        doc.text("Inspection Summary", 15, currentY);
        currentY += 10;

        const summaryRows = [
            ["Client Name", inspection.clientName || "Not recorded"],
            ["Site / Location", inspection.siteLocation || "Not recorded"],
            ["Auditor Name", inspection.auditorName || "Not recorded"],
            ["Inspection Date", inspection.inspectionDate || "Not recorded"],
            ["Inspection Start Time", inspection.startTime || "Not recorded"],
            ["Total Findings", String(inspection.findings.length)],
            [
                "Inspection Status",
                inspection.saved ? "Active" : "Not started"
            ]
        ];

        for (const row of summaryRows) {
            currentY = addPdfTextBlock(
                doc,
                row[0],
                row[1],
                currentY
            );
        }

        currentY += 10;

        // -----------------------------------------------------
        // Findings
        // -----------------------------------------------------
        inspection.findings.forEach(function (finding, index) {
            currentY = addPdfSectionHeading(
                doc,
                `Finding ${finding.findingNumber || index + 1}`,
                currentY
            );

            const findingRows = [
                [
                    "Finding Number",
                    String(finding.findingNumber || index + 1)
                ],
                [
                    "Audit Date",
                    finding.auditDate ||
                        inspection.inspectionDate ||
                        "Not recorded"
                ],
                [
                    "Finding",
                    finding.finding || ""
                ],
                [
                    "Pest",
                    finding.pestIssue || ""
                ],
                [
                    "Area",
                    finding.area || ""
                ],
                [
                    "Observation",
                    finding.observation || ""
                ],
                [
                    "Action Plan",
                    finding.actionPlan || ""
                ],
                [
                    "Timeline",
                    finding.timeline || ""
                ],
                [
                    "Responsibility",
                    finding.responsibility || ""
                ],
                [
                    "Priority",
                    finding.priority || ""
                ],
                [
                    "Status",
                    finding.status || ""
                ],
                [
                    "Ageing Days",
                    String(
                        calculateAgeingDays(
                            inspection.inspectionDate
                        )
                    )
                ],
                [
                    "Remarks",
                    finding.photoNote || ""
                ]
            ];

            // Keep the finding table together as much as possible.
            // Individual rows automatically move to the next page if needed.
            for (const row of findingRows) {
                currentY = addPdfTextBlock(
                    doc,
                    row[0],
                    row[1],
                    currentY
                );
            }

            currentY += 5;

            if (finding.markedPhoto) {
                currentY = addPdfMarkedPhoto(
                    doc,
                    finding.markedPhoto,
                    currentY
                );
            } else {
                currentY = addPdfTextBlock(
                    doc,
                    "Picture",
                    "No marked photo available",
                    currentY
                );
                currentY += 5;
            }
        });

        const filename =
            `PestSnap_Inspection_Report_${sanitizeFilename(
                inspection.clientName
            )}_${inspection.inspectionDate || getCurrentDate()}.pdf`;

        doc.save(filename);

        showAppMessage(
            "PDF report downloaded successfully."
        );
    } catch (error) {
        console.error(
            "PDF generation error:",
            error
        );

        showAppMessage(
            "Unable to generate PDF report. Please try again."
        );
    } finally {
        if (downloadPdfButton) {
            downloadPdfButton.disabled =
                inspection.findings.length === 0;
        }
    }
}

// =========================================================
// Excel - Template Based
// =========================================================

if (downloadExcelButton) {

    downloadExcelButton.addEventListener(
        "click",
        generateExcelReport
    );
}


async function ensureExcelJsLoaded() {
    // Load ExcelJS automatically so Excel generation does not depend on
    // an ExcelJS CDN script already being present in index.html.
    if (window.ExcelJS) {
        return window.ExcelJS;
    }

    const src =
        "https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js";

    await new Promise(function (resolve, reject) {
        const existing =
            document.querySelector(
                'script[data-pestsnap-exceljs="true"]'
            );

        if (existing) {
            const started = Date.now();
            const timeoutMs = 15000;

            const timer = setInterval(function () {
                if (window.ExcelJS) {
                    clearInterval(timer);
                    resolve();
                } else if (Date.now() - started > timeoutMs) {
                    clearInterval(timer);
                    reject(
                        new Error(
                            "ExcelJS timed out while loading."
                        )
                    );
                }
            }, 50);

            return;
        }

        const script =
            document.createElement("script");

        script.src = src;
        script.async = true;
        script.dataset.pestsnapExceljs = "true";

        script.onload = function () {
            if (window.ExcelJS) {
                resolve();
            } else {
                reject(
                    new Error(
                        "ExcelJS loaded, but the library was not found."
                    )
                );
            }
        };

        script.onerror = function () {
            reject(
                new Error(
                    "Unable to load ExcelJS from the CDN."
                )
            );
        };

        document.head.appendChild(script);
    });

    return window.ExcelJS;
}

async function generateExcelReport() {

    if (inspection.findings.length === 0) {
        showAppMessage("No findings available for Excel.");
        return;
    }

    try {
        showAppMessage("Preparing Excel report...");

        const ExcelJSLibrary =
            await ensureExcelJsLoaded();

        const response = await fetch("template.xlsx");

        if (!response.ok) {
            throw new Error("template.xlsx could not be loaded.");
        }

        const arrayBuffer = await response.arrayBuffer();

        const workbook =
            new ExcelJSLibrary.Workbook();

        await workbook.xlsx.load(arrayBuffer);

        console.log(
            "Excel worksheet names:",
            workbook.worksheets.map(ws => ws.name)
        );

        const worksheet =
            workbook.getWorksheet("Report");

        if (!worksheet) {
            throw new Error(
                "No worksheet found. Available sheets: " +
                workbook.worksheets.map(ws => ws.name).join(", ")
            );
        }

        const excelText = function (value) {
            return String(value ?? "")
                .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
                .trim();
        };

        worksheet.getCell("E5").value =
            excelText(inspection.clientName);
        worksheet.getCell("K5").value =
            excelText(inspection.siteLocation);

        const startRow = 8;

        for (let index = 0; index < inspection.findings.length; index++) {
            const finding = inspection.findings[index];
            const rowNumber = startRow + index;
            const row = worksheet.getRow(rowNumber);

            // Column B (2): # (Finding number)
            row.getCell(2).value =
                finding.findingNumber ?? index + 1;

            // Column C (3): Audit Date
            row.getCell(3).value =
                excelText(finding.auditDate || inspection.inspectionDate);

            // Column D (4): Picture (Marked photo inserted via worksheet.addImage below)

            // Column E (5): Pest
            row.getCell(5).value = excelText(finding.pestIssue);

            // Column F (6): Area
            row.getCell(6).value = excelText(finding.area);

            // Column G (7): Observations
            row.getCell(7).value = excelText(finding.observation);

            // Column H (8): Action plan
            row.getCell(8).value = excelText(finding.actionPlan);

            // Column I (9): Time line / Status
            row.getCell(9).value = excelText(finding.timeline);

            // Column J (10): Responsibility
            row.getCell(10).value = excelText(finding.responsibility);

            // Column K (11): Status
            row.getCell(11).value = excelText(finding.status);

            // Column L (12): Ageing Days
            row.getCell(12).value =
                calculateAgeingDays(finding.auditDate || inspection.inspectionDate);

            // Column M (13): Remarks
            row.getCell(13).value = excelText(finding.photoNote);

            if (finding.markedPhoto) {
                console.log(
                    "markedPhoto:",
                    finding.markedPhoto?.substring(0, 50)
                );

                const imageMatch = finding.markedPhoto.match(
                    /^data:image\/(png|jpeg|jpg);base64,/i
                );

                if (!imageMatch) {
                    throw new Error(
                        "Unsupported marked photo format. Expected a PNG or JPEG data URL."
                    );
                }

                const extension =
                    imageMatch[1].toLowerCase() === "png"
                        ? "png"
                        : "jpeg";
                const imageId = workbook.addImage({
                    base64: finding.markedPhoto,
                    extension
                });

                // ExcelJS image columns are zero-based: col 3 = Excel column D.
                worksheet.addImage(imageId, {
                    tl: { col: 3, row: rowNumber - 1 },
                    // Use a two-cell anchor like the template logo. Offsets are EMU:
                    // 220 px * 9525 and 150 px * 9525.
                    br: {
                        nativeCol: 3,
                        nativeColOff: 2095500,
                        nativeRow: rowNumber - 1,
                        nativeRowOff: 1428750
                    }
                });

                console.log("Image added:", {
                    finding: finding.findingNumber,
                    row: rowNumber,
                    column: "D",
                    markedPhoto: !!finding.markedPhoto
                });
            }
        }

        const output = await workbook.xlsx.writeBuffer();
        const blob = new Blob([output], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `PestSnap_Inspection_${inspection.inspectionDate}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showAppMessage("Excel report downloaded successfully.");
    } catch (error) {
        console.error("Excel generation error:", error);

        const message =
            error && error.message
                ? error.message
                : String(error);

        showAppMessage(
            "Excel error: " + message
        );
    }
}
