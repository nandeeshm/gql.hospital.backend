class MedicalReportVerification {
    required: boolean = false;
    requiredTo: string;
    verifiedBy: string;
    verifiedAt: Date;
    notes: string;
}

class MedicalReport {
    bindToReport: string;
    department: string;
    reportType: string;
    reportDate: Date;
    signedBy: Date;
    verification: MedicalReportVerification;
    content: string;
    attachedTests: string[];
}

export default MedicalReport;