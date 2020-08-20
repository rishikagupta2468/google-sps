const db = require("../database.js");

const reportDbOperations = {
    getAllReports: async () => {
        try{
            const reports = await db.collection('reports').get();
            if(reports.exists) {
                const allReports = reports.data();
                return { 'responseCode': '1', 'reports': allReports};
            }
            else{
                return { 'responseCode': '0' };
            }
        } catch (err) {
            throw new Error(err);
        }
    },

    findReportById: async(id) => {
        try {
            const reportReference = db.collection('reports').doc(id);
            const report = await reportReference.get();
            if (report.exists) {
                const reportObject = report.data(); 
                return { 'responseCode': '1', 'report': reportObject}; 
            } else {
                return { 'responseCode': '0' }; 
            }
        } catch (err) {
            throw new Error(err);
        }
    },

    createReport: async(Report) => {
        db.collection("reports").add({
            img: Report.img,
            description: Report.description
        }).then(function(newReport) {
            return { 'responseCode': '1', 'reportReference': newReport.id};
        });
    },

    editReport:  async(Report) => {
        try{
            db.collection("reports").doc(id).update({
                "img": Report.img,
                "description": Reportdescription,
            });
            return { 'responseCode': '1' };
        }catch(err) {
            throw new Error(err);
        }
    },

    deleteArticle: async(id) => {
        db.collection("reports").doc(id).delete().then(function() {
            return { 'responseCode': '1' };
        }).catch(function(error) {
            return { 'responseCode': '0' };
        });
    }
}
module.exports = reportDbOperations;