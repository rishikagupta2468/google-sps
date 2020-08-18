package com.google.spsproject.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.spsproject.data.Authentication;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/authenticate")
public class AuthenticationServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        UserService userService = UserServiceFactory.getUserService();
        Authentication authObject = new Authentication();
        if (userService.isUserLoggedIn()) {
            String urlToRedirectToAfterUserLogsOut = "/";
            String logoutUrl = userService.createLogoutURL(urlToRedirectToAfterUserLogsOut);
            authObject.setIsUserLoggedIn(true);
            authObject.setEmail(userService.getCurrentUser().getEmail());
            authObject.setLogOutUrl(logoutUrl);
        } else {
            String urlToRedirectToAfterUserLogsIn = "/";
            String loginUrl = userService.createLoginURL(urlToRedirectToAfterUserLogsIn);
            authObject.setLogInUrl(loginUrl);
        }
        Gson gson = new GsonBuilder().disableHtmlEscaping().create();
        response.setContentType("application/json");
        response.getWriter().println(gson.toJson(authObject));
    }
}