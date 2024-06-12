package org.example.backend.controller;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/files")
public class FileController {

    @PostMapping("/img")
    public String saveProductImg(@RequestParam MultipartFile file) throws IOException {
        String name= UUID.randomUUID()+file.getOriginalFilename();
        FileOutputStream fileOutputStream = new FileOutputStream("backend/files/"+name);
        fileOutputStream.write(file.getBytes());
        fileOutputStream.close();
        return name;
    }

    @GetMapping("/img")
    public void getImg(HttpServletResponse response,@RequestParam String name) throws IOException {
        FileInputStream fileInputStream=new FileInputStream(
                "backend/files/"+name);
        ServletOutputStream outputStream = response.getOutputStream();
        fileInputStream.transferTo(outputStream);
        fileInputStream.close();
        outputStream.close();
    }
}