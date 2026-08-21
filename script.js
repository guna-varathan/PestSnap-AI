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

const rootCauseInput =
    document.getElementById("rootCause");

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

let editingFindingNumber =
    null;

let cancelEditButton =
    null;


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
    findingArea.value = "";
    observation.value = "";
    rootCauseInput.value = "";
    actionPlan.value = "";
    responsibility.value = "";
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

    pestIssue.value =
        finding.pestIssue || "";

    findingArea.value =
        finding.area || "";

    observation.value =
        finding.observation || "";

    rootCauseInput.value =
        finding.rootCause || "";

    actionPlan.value =
        finding.actionPlan || "";

    timeline.value =
        finding.timeline || "";

    responsibility.value =
        finding.responsibility || "";

    priorityInput.value =
        finding.priority || "";

    findingStatus.value =
        finding.status || "Open";

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

photoButton.addEventListener(
    "click",
    function () {

        photoInput.click();
    }
);


// =========================================================
// Replace Photo
// =========================================================

replacePhotoButton.addEventListener(
    "click",
    function () {

        photoInput.click();
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

photoInput.addEventListener(
    "change",
    function () {

        const file =
            photoInput.files[0];


        if (!file) {
            return;
        }


        if (!file.type.startsWith("image/")) {

            showAppMessage(
                "Please select a PNG, JPG, JPEG, or WEBP image."
            );

            photoInput.value = "";

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


                photoInput.value =
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


        if (!pestIssue.value.trim()) {

            showAppMessage(
                "Please enter the pest."
            );

            pestIssue.focus();

            return;
        }


        if (!findingArea.value.trim()) {

            showAppMessage(
                "Please enter the area."
            );

            findingArea.focus();

            return;
        }


        if (!observation.value.trim()) {

            showAppMessage(
                "Please enter the observation."
            );

            observation.focus();

            return;
        }


        if (!rootCauseInput.value.trim()) {

            showAppMessage(
                "Please enter the root cause."
            );

            rootCauseInput.focus();

            return;
        }


        if (!actionPlan.value) {

            showAppMessage(
                "Please select an action plan."
            );

            actionPlan.focus();

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
                pestIssue.value.trim();

            finding.area =
                findingArea.value.trim();

            finding.observation =
                observation.value.trim();

            finding.rootCause =
                rootCauseInput.value.trim();

            finding.actionPlan =
                actionPlan.value;

            finding.timeline =
                timeline.value;

            finding.responsibility =
                responsibility.value;

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
                pestIssue.value.trim(),

            area:
                findingArea.value.trim(),

            observation:
                observation.value.trim(),

            rootCause:
                rootCauseInput.value.trim(),

            actionPlan:
                actionPlan.value,

            timeline:
                timeline.value,

            responsibility:
                responsibility.value,

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
            <strong>Root Cause:</strong>
            ${escapeHtml(finding.rootCause || "")}
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

    findingInput.value =
        "";

    findingArea.value =
        "";

    observation.value =
        "";

    rootCauseInput.value =
        "";

    actionPlan.value =
        "";

    responsibility.value =
        "";

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
                    "Root Cause",
                    finding.rootCause || ""
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

        const response = await fetch("template.xlsx");

        console.log(
            "template.xlsx response:",
            response.status,
            response.statusText,
            response.url
        );

        if (!response.ok) {
            throw new Error("template.xlsx could not be loaded.");
        }

        const arrayBuffer = await response.arrayBuffer();

        // Make sure ExcelJS is available even when index.html
        // does not include the ExcelJS CDN script.
        const ExcelJSLibrary =
            await ensureExcelJsLoaded();

        const workbook =
            new ExcelJSLibrary.Workbook();

        await workbook.xlsx.load(arrayBuffer);

        const worksheet = workbook.getWorksheet("Report");

        if (!worksheet) {
            throw new Error("Report sheet was not found.");
        }

        // New Excel template mapping
        // Client Name -> E5
        // Location -> K5
        worksheet.getCell("E5").value =
            String(inspection.clientName || "").trim();
        worksheet.getCell("K5").value =
            String(inspection.siteLocation || "").trim();

        // Header row is 7; first finding row is 8.
        const startRow = 8;

        for (let index = 0; index < inspection.findings.length; index++) {
            const finding = inspection.findings[index];
            const rowNumber = startRow + index;
            const row = worksheet.getRow(rowNumber);

            row.getCell(2).value = finding.findingNumber;
            row.getCell(3).value = inspection.inspectionDate;
            row.getCell(5).value = finding.finding || "";
            row.getCell(6).value = finding.pestIssue || "";
            row.getCell(7).value = finding.area || "";
            row.getCell(8).value = finding.observation || "";
            row.getCell(9).value = finding.rootCause || "";
            row.getCell(10).value = finding.actionPlan || "";
            row.getCell(11).value = finding.timeline || "";
            row.getCell(12).value = finding.responsibility || "";
            row.getCell(13).value = finding.priority || "";
            row.getCell(14).value = finding.status || "";
            row.getCell(15).value =
                calculateAgeingDays(inspection.inspectionDate);

            console.log(
                "Excel Remarks for Finding " + finding.findingNumber + ":",
                finding.photoNote
            );

            row.getCell(16).value = finding.photoNote || "";
            row.alignment = { vertical: "top", wrapText: true };
            row.height = 153.75;

            if (finding.markedPhoto) {
                const imageId = workbook.addImage({
                    base64: finding.markedPhoto,
                    extension: "jpeg"
                });

                // ExcelJS image columns are zero-based: col 3 = Excel column D.
                worksheet.addImage(imageId, {
                    tl: { col: 3, row: rowNumber - 1 },
                    ext: { width: 180, height: 120 }
                });
            }
        }

        worksheet.views = [{ state: "frozen", ySplit: 11 }];

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
