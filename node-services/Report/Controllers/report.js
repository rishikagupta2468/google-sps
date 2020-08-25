const db = require("../database.js");

const reportDbOperations = {
    getAllReports: async () => {
        const reports = await db.collection('reports');
        const allReports = [];
        await reports.get().then( async function(querySnapshot) {
        for(var i in querySnapshot.docs)
        {
            allReports.push( {'id' : querySnapshot.docs[i].id, "reportData" : querySnapshot.docs[i].data()});
        }}).catch(function(error) {
            console.log("Error getting documents: ", error);
            return { 'responseCode': '0'}; 
        });
        return { 'responseCode': '1', 'reports': allReports}; 
    },

    findReportById: async(id) => {
        const reportReference = db.collection('reports').doc(id);
        const report = await reportReference.get();
        if (report.exists) {
            const reportObject = report.data(); 
            return { 'responseCode': '1', 'id': reportObject.id, 'report': reportObject}; 
        } else {
            return { 'responseCode': '0' }; 
        }
    },

    createReport: async(Report) => {
        db.collection("reports").add({
            img: Report.img,
            description: Report.description,
            user: Report.email
        }).then(function(newReport) {
            return { 'responseCode': '1', 'reportReference': newReport.id};
        });
    },

    editReport:  async(Report) => {
        db.collection("reports").doc(Report.id).update({
            "img": Report.img,
            "description": Report.description
        }).then(function(updateReport) {
            return { 'responseCode': '1', 'reportReference': updateReport.id};
        });
    },

    deleteReport: async(id) => {
        db.collection("reports").doc(id).delete().then(function() {
            return { 'responseCode': '1' };
        }).catch(function(error) {
            return { 'responseCode': '0' };
        });
    }
}
module.exports = reportDbOperations;