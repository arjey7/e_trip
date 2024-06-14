package org.example.backend.controller;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/files")
public class FileController {
    private static final String UPLOAD_DIR = "backend/e_video/";
    private static final String IMAGE_UPLOAD_DIR = "backend/resors/";
    private static final String UPLOAD_DIRS = "backend/e_tour/";

    @PostMapping("/img")
    public String saveProductImg(@RequestParam MultipartFile file) throws IOException {
        String name = UUID.randomUUID() + file.getOriginalFilename();
        FileOutputStream fileOutputStream = new FileOutputStream(IMAGE_UPLOAD_DIR + name);
        fileOutputStream.write(file.getBytes());
        fileOutputStream.close();
        return name;
    }

    @GetMapping("/img")
    public void getImg(HttpServletResponse response, @RequestParam String name) throws IOException {
        FileInputStream fileInputStream = new FileInputStream(IMAGE_UPLOAD_DIR + name);
        ServletOutputStream outputStream = response.getOutputStream();
        fileInputStream.transferTo(outputStream);
        fileInputStream.close();
        outputStream.close();
    }

    @PostMapping("/video")
    public ResponseEntity<String> uploadVideo(@RequestParam("file") MultipartFile file) {
        try {
            // Ensure the upload directory exists
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Save the file
            String fileName = UUID.randomUUID() + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.copy(file.getInputStream(), filePath);

            return ResponseEntity.ok(fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed");
        }
    }

    @GetMapping("/video")
    public void getVideo(HttpServletResponse response, @RequestParam String name) throws IOException {
        Path filePath = Paths.get(UPLOAD_DIR, name);
        File videoFile = filePath.toFile();

        if (!videoFile.exists()) {
            response.setStatus(HttpStatus.NOT_FOUND.value());
            return;
        }

        FileInputStream fileInputStream = new FileInputStream(videoFile);
        ServletOutputStream outputStream = response.getOutputStream();
        fileInputStream.transferTo(outputStream);
        fileInputStream.close();
        outputStream.close();
    }
    @PostMapping("/tourDay")
    public String saveTourDayImg(@RequestParam MultipartFile file) throws IOException {
        System.out.println(file.getOriginalFilename());
        String name = UUID.randomUUID() + file.getOriginalFilename();
        FileOutputStream fileOutputStream = new FileOutputStream(UPLOAD_DIRS + name);
        fileOutputStream.write(file.getBytes());
        fileOutputStream.close();
        return name;
    }

    @GetMapping("/tourDay")
    public void getTourDayImg(HttpServletResponse response, @RequestParam String name) throws IOException {
        FileInputStream fileInputStream = new FileInputStream(UPLOAD_DIRS + name);
        ServletOutputStream outputStream = response.getOutputStream();
        fileInputStream.transferTo(outputStream);
        fileInputStream.close();
        outputStream.close();
    }
}
