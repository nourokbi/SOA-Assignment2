package com.example.demo.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Collections;
import java.util.Comparator;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import com.example.demo.api.model.Student;

@Service
public class StudentService {

    private static final String FILE_PATH = "university.xml";


    // ====================================================================== //
    // the functions that work directly with the xml file
    // ====================================================================== //

    static Document buildOrLoadDocument() throws Exception {
        Document document;
        File file = new File(FILE_PATH);

        if (file.exists()) {
            // Load existing XML document
            document = loadDocument(file);
        } else {
            // Build a new XML document
            document = buildDocument();
        }

        return document;
    }

    private static Document buildDocument() throws ParserConfigurationException {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document document = builder.newDocument();

        Element universityElement = document.createElement("University");
        document.appendChild(universityElement);

        return document;
    }

    static Document loadDocument(File file) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        return builder.parse(file);
    }

    static void addStudentData(Document document, Student student) {
        Element universityElement = document.getDocumentElement();
        Element studentElement = document.createElement("Student");

        System.out.println(student);


        studentElement.setAttribute("ID", student.getId());

        addElement(document, studentElement, "FirstName", student.getFirstName());
        addElement(document, studentElement, "LastName", student.getLastName());
        addElement(document, studentElement, "Gender", student.getGender());
        addElement(document, studentElement, "GPA", student.getGpa());
        addElement(document, studentElement, "Level", student.getLevel());
        addElement(document, studentElement, "Address", student.getAddress());

        System.out.println(studentElement);
        universityElement.appendChild(studentElement);
    }

    private static void addElement(Document document, Element parentElement, String elementName, String textContent) {
        Element element = document.createElement(elementName);
        element.setTextContent(textContent);
        parentElement.appendChild(element);
    }

    static void saveDocument(Document document) throws Exception {
        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transformer = transformerFactory.newTransformer();
        DOMSource source = new DOMSource(document);
        StreamResult result = new StreamResult(new File(FILE_PATH));
        transformer.transform(source, result);
    }


    // return one specific student
    static Student searchInDocument(Document document, String searchWord) {
        NodeList nodeList = document.getElementsByTagName("Student");

        for (int i = 0; i < nodeList.getLength(); i++) {
            Node studentNode = nodeList.item(i);

            if (studentNode.getNodeType() == Node.ELEMENT_NODE) {
                Element studentElement = (Element) studentNode;

                String firstName = studentElement.getElementsByTagName("FirstName").item(0).getTextContent();
                String gpa = studentElement.getElementsByTagName("GPA").item(0).getTextContent();
                String id = studentElement.getAttribute("ID");
                String lastName = studentElement.getElementsByTagName("LastName").item(0).getTextContent();
                String level = studentElement.getElementsByTagName("Level").item(0).getTextContent();
                String gender = studentElement.getElementsByTagName("Gender").item(0).getTextContent();
                String address = studentElement.getElementsByTagName("Address").item(0).getTextContent();
                if (firstName.equals(searchWord) || gpa.equals(searchWord) || id.equals(searchWord)
                        || lastName.equals(searchWord) || address.equals(searchWord)
                        || gender.equals(searchWord) || level.equals(searchWord)) {
                    return new Student(id, firstName, lastName, level, gpa, gender, address);
                }
            }
        }
        return new Student();
    }


    // delete one specific student
    static void deleteStudentById(Document document, String studentId) {
        NodeList nodeList = document.getElementsByTagName("Student");
        for (int i = 0; i < nodeList.getLength(); i++) {
            Node studentNode = nodeList.item(i);

            if (studentNode.getNodeType() == Node.ELEMENT_NODE) {
                Element studentElement = (Element) studentNode;

                String id = studentElement.getAttribute("ID");

                if (id.equals(studentId)) {

                    studentNode.getParentNode().removeChild(studentNode);
                    System.out.println("Student with ID " + studentId + " deleted successfully.");
                    return;
                }
            }
        }

        System.out.println("Student with ID " + studentId + " not found.");
    }


    // get all the students in the xml file
    public List<Student> getAllStudents(Document document) {
        NodeList nodeList = document.getElementsByTagName("Student");
        List<Student> students = new ArrayList<>();

        for (int i = 0; i < nodeList.getLength(); i++) {
            Node studentNode = nodeList.item(i);

            if (studentNode.getNodeType() == Node.ELEMENT_NODE) {
                Element studentElement = (Element) studentNode;

                String id = studentElement.getAttribute("ID");
                String firstName = studentElement.getElementsByTagName("FirstName").item(0).getTextContent();
                String lastName = studentElement.getElementsByTagName("LastName").item(0).getTextContent();
                String level = studentElement.getElementsByTagName("Level").item(0).getTextContent();
                String gpa = studentElement.getElementsByTagName("GPA").item(0).getTextContent();
                String gender = studentElement.getElementsByTagName("Gender").item(0).getTextContent();
                String address = studentElement.getElementsByTagName("Address").item(0).getTextContent();

                students.add(new Student(id, firstName, lastName, level, gpa, gender, address));
            }
        }
        return students;
    }


    // get all matched students from the xml file
    public static List<Student> getSpecificStudents(Document document, String searchWord) {
        NodeList nodeList = document.getElementsByTagName("Student");
        List<Student> students = new ArrayList<>();

        for (int i = 0; i < nodeList.getLength(); i++) {
            Node studentNode = nodeList.item(i);

            if (studentNode.getNodeType() == Node.ELEMENT_NODE) {
                Element studentElement = (Element) studentNode;

                String firstName = studentElement.getElementsByTagName("FirstName").item(0).getTextContent();
                String gpa = studentElement.getElementsByTagName("GPA").item(0).getTextContent();
                String id = studentElement.getAttribute("ID");
                String lastName = studentElement.getElementsByTagName("LastName").item(0).getTextContent();
                String level = studentElement.getElementsByTagName("Level").item(0).getTextContent();
                String gender = studentElement.getElementsByTagName("Gender").item(0).getTextContent();
                String address = studentElement.getElementsByTagName("Address").item(0).getTextContent();
                if (firstName.equals(searchWord) || gpa.equals(searchWord) || id.equals(searchWord)
                        || lastName.equals(searchWord) || address.equals(searchWord)
                        || gender.equals(searchWord) || level.equals(searchWord)) {
                    students.add(new Student(id, firstName, lastName, level, gpa, gender, address));
                }
            }
        }
        return students;
    }

    // ====================================================================== //
    // the abstract for the main functions that we call from the controller
    // ====================================================================== //

    public List<Student> getMatchedStudents(String search) throws Exception {
        Document document = buildOrLoadDocument();
        List<Student> students = getSpecificStudents(document, search);
        saveDocument(document);
        return students;
    }

    public List<Student> getStudents() throws Exception {
        Document document = buildOrLoadDocument();
        List<Student> students = getAllStudents(document);
        saveDocument(document);

        return students;
    }

    public void deleteStudent(String id) throws Exception {
        Document document = buildOrLoadDocument();
        deleteStudentById(document, id);
        saveDocument(document);

    }

    public void updateStudent(Student student) throws Exception {
        deleteStudent(student.getId());
        addStudent(student);

    }

    public Student getStudent(String searchWord) throws Exception {
        Document document = buildOrLoadDocument();
        Student student = searchInDocument(document, searchWord);
        // =========================================
        // always save the doc after you work with it
        // =========================================
        System.out.println(searchWord);
        saveDocument(document);
        return student;
    }

    public void addStudent(Student student) throws Exception {
        Document document = buildOrLoadDocument();
        addStudentData(document, student);
        // =========================================
        // always save the doc after you work with it
        // =========================================
        saveDocument(document);
    }

    public void sortStudents(String sortProperty, boolean ascending) throws Exception {
        Document document = buildOrLoadDocument();
        List<Student> students = getAllStudents(document);

        // Define a comparator based on the specified property
        Comparator<Student> comparator = getComparatorByProperty(sortProperty);

        // Sort the students
        if (ascending) {
            Collections.sort(students, comparator);
        } else {
            Collections.sort(students, Collections.reverseOrder(comparator));
        }

        // Clear existing students in the document
        clearStudentsInDocument(document);

        // Add sorted students to the document
        for (Student student : students) {
            addStudentData(document, student);
        }

        // Save the sorted document
        saveDocument(document);
    }

    private Comparator<Student> getComparatorByProperty(String sortProperty) {
        switch (sortProperty.toLowerCase()) {
            case "id":
                return Comparator.comparing(Student::getId);
            case "firstname":
                return Comparator.comparing(Student::getFirstName);
            case "lastname":
                return Comparator.comparing(Student::getLastName);
            case "gender":
                return Comparator.comparing(Student::getGender);
            case "gpa":
                return Comparator.comparing(Student::getGpa);
            case "level":
                return Comparator.comparing(Student::getLevel);
            default:
                throw new IllegalArgumentException("Invalid sort property: " + sortProperty);
        }
    }

    private void clearStudentsInDocument(Document document) {
        Node universityNode = document.getDocumentElement();
        NodeList studentNodes = universityNode.getChildNodes();

        for (int i = studentNodes.getLength() - 1; i >= 0; i--) {
            Node studentNode = studentNodes.item(i);
            if (studentNode.getNodeType() == Node.ELEMENT_NODE && studentNode.getNodeName().equals("Student")) {
                universityNode.removeChild(studentNode);
            }
        }
    }

}