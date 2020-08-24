package com.google.spsproject.servlets;

import com.google.spsproject.data.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse; 
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.api.core.ApiFuture;
import java.util.Map;
import java.util.HashMap;
import java.util.logging.Logger;
import java.util.logging.Level;
import java.util.logging.FileHandler;
import java.util.logging.SimpleFormatter;

@WebServlet("/user")
public class UserServlet extends HttpServlet {
    private Firestore db;
    private static final Logger logger = Logger.getLogger(UserServlet.class.getName());
    private FileHandler filehandler;

    public UserServlet() throws IOException {
        FirestoreOptions firestoreOptions =
        FirestoreOptions.getDefaultInstance().toBuilder()
        .setProjectId("summer20-sps-77")
        .setCredentials(GoogleCredentials.getApplicationDefault())
        .build();
        this.db = firestoreOptions.getService();
        filehandler = new FileHandler("errorfile.log");
        logger.addHandler(filehandler);
        SimpleFormatter formatter = new SimpleFormatter();
        filehandler.setFormatter(formatter);
    }

    public static boolean validateString(String string) {
        if (string != null && !string.trim().isEmpty()) return true;
        return false;
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String email = request.getParameter("email");
        DocumentReference docRef = db.collection("users").document(email);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        User userObject = new User();
        try {
            DocumentSnapshot document = future.get();
            if (document.exists()) {
                userObject.setEmail(email);
                userObject.setName(document.get("name").toString());
                userObject.setAge(Integer.parseInt(document.get("age").toString()));
                userObject.setGender(document.get("gender").toString().toUpperCase());
            }
        } catch(Exception e) {
            logger.log(Level.SEVERE, "Class UserServlet: Error while reading from DB and writing into userobject", e);
        }
        Gson gson = new Gson();
        response.setContentType("application/json");
        response.getWriter().println(gson.toJson(userObject));
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        BufferedReader bufferReader = new BufferedReader(new InputStreamReader(request.getInputStream()));
        String json = "";
        if (bufferReader != null) {
            json = bufferReader.readLine();
        }
        Gson gson = new Gson();
        User userObject = gson.fromJson(json, User.class);
        String email = userObject.getEmail();
        String name = userObject.getName();
        int age = userObject.getAge();
        String gender = userObject.getGender();
        if (validateString(email) == false || validateString(name) == false || validateString(gender) == false || age <= 0) {
            response.sendError(400, "Enter valid parameters" );
            return;
        }
        try {
            DocumentReference docRef = db.collection("users").document(email);
            Map<String, Object> docData = new HashMap<>();
            docData.put("name", name);
            docData.put("age", age);
            docData.put("gender", gender);
            ApiFuture<WriteResult> future = db.collection("users").document(email).set(docData);
            response.setContentType("application/json");
            response.getWriter().println(gson.toJson(userObject));
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Class UserServlet: Error while writing into DB ", e);
        }
    }
}