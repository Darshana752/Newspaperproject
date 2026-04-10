package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.model.Reader;
import com.example.backend.model.Writer;
import com.example.backend.repository.ReaderRepository;
import com.example.backend.repository.WriterRepository;
import com.example.backend.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

  private final AuthService authService;
  private final WriterRepository writerRepo; // ✅ REQUIRED
  private final ReaderRepository readerRepo;

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
    return ResponseEntity.ok(authService.register(request));
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
    return ResponseEntity.ok(authService.login(request));
  }

  // In a new WriterController or AuthController
  @GetMapping("/writers")
  public ResponseEntity<List<Writer>> getAllWriters() {
    return ResponseEntity.ok(writerRepo.findAll());
  }

  @DeleteMapping("/writers/{id}")
  public ResponseEntity<String> deleteWriter(@PathVariable Long id) {
    writerRepo.deleteById(id);
    return ResponseEntity.ok("Writer deleted");
  }

  @GetMapping("/readers")
  public ResponseEntity<List<Reader>> getAllReaders() {
    return ResponseEntity.ok(readerRepo.findAll());
  }

  @DeleteMapping("/readers/{id}")
  public ResponseEntity<String> deleteReader(@PathVariable Long id) {
    readerRepo.deleteById(id);
    return ResponseEntity.ok("Reader deleted");
  }

}