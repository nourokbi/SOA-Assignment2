package com.example.demo.api.controller;

import com.example.demo.api.model.Student;
import com.example.demo.service.StudentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    private StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }


    // to get specific students
    @GetMapping("/search")
    public String getStudents(@RequestParam String search) throws Exception {
        List<Student> students = studentService.getMatchedStudents(search);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonStudents = objectMapper.writeValueAsString(students);
        System.out.println(jsonStudents);
        return jsonStudents;


    }


    // to get all the students
    @GetMapping("/students")
    public String getStudents() throws Exception {
        List<Student> students = studentService.getStudents();
        // Convert the list of students to a JSON string
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonStudents = objectMapper.writeValueAsString(students);

        return jsonStudents;
    }


    // CRUD operations for a single student

    @PostMapping("/student")
    public void addStudent(@RequestBody String json) throws Exception {
        System.out.println(json);
        ObjectMapper objectMapper = new ObjectMapper();
        Student student = objectMapper.readValue(json, Student.class);

        System.out.println(json);
        System.out.println(student.getId());
        studentService.addStudent(student);
    }

    @DeleteMapping("/student")
    public void deleteStudent(@RequestParam String id) throws Exception {
        studentService.deleteStudent(id);
        System.out.println(id);
    }

    @GetMapping("/student")
    public Student getStudentDetails(@RequestParam String id) throws Exception {
        Student student = studentService.getStudent(id);
        System.out.println(student);
        return student;


    }

    @PatchMapping("/student")
    public void updateStudent(@RequestBody String json) throws Exception {
        System.out.println(json);
        ObjectMapper objectMapper = new ObjectMapper();
        Student student = objectMapper.readValue(json, Student.class);

        System.out.println(json);
        studentService.updateStudent(student);
    }


}
