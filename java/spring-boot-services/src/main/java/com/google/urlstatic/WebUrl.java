package com.google.urlstatic;

// Add imports
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
public class WebUrl {
  public static void main(String[] args) {
    SpringApplication.run(WebUrl.class, args);
  }
}

// Add the controller.
@Controller
class HelloWorldController {
  @RequestMapping("/")
    public ModelAndView home() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index");
        return modelAndView;
    }
}