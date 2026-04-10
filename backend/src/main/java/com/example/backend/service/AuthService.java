package com.example.backend.service;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.model.Editor;
import com.example.backend.model.Reader;
import com.example.backend.model.Writer;
import com.example.backend.repository.EditorRepository;
import com.example.backend.repository.ReaderRepository;
import com.example.backend.repository.WriterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final ReaderRepository readerRepo;
  private final EditorRepository editorRepo;
  private final WriterRepository writerRepo;
  private final PasswordEncoder passwordEncoder;

  // ── REGISTER ───────────────────────────────────────────────
  public String register(RegisterRequest request) {
    String encoded = passwordEncoder.encode(request.getPassword());

    switch (request.getRole().toUpperCase()) {
      case "READER" -> {
        Reader reader = new Reader();
        reader.setName(request.getName());
        reader.setEmail(request.getEmail());
        reader.setPassword(encoded);
        readerRepo.save(reader);
      }
      case "WRITER" -> {
        Writer writer = new Writer();
        writer.setName(request.getName());
        writer.setEmail(request.getEmail());
        writer.setPassword(encoded);
        writer.setNic(request.getNic());
        writerRepo.save(writer);
      }
      case "EDITOR" -> {
        throw new RuntimeException("Editor accounts cannot be self-registered.");
      }
      default -> throw new RuntimeException("Invalid role: " + request.getRole());
    }
    return "User registered successfully!";
  }

  // ── LOGIN ──────────────────────────────────────────────────
  public LoginResponse login(LoginRequest request) {
    String role = request.getRole().toUpperCase();
    String rawPassword = request.getPassword();

    return switch (role) {

      case "READER" -> {
        Reader r = readerRepo.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Reader not found"));
        if (!passwordEncoder.matches(rawPassword, r.getPassword()))
          throw new RuntimeException("Invalid password");
        yield new LoginResponse(
            r.getReaderId(),
            r.getName(),
            r.getEmail(),
            "READER",
            "Login successful as READER");
      }

      case "EDITOR" -> {
        if (!request.getEmail().equals("malithdarshana2000@gmail.com")) {
          throw new RuntimeException("Access denied. Unauthorized editor.");
        }
        Editor e = editorRepo.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Editor not found"));
        if (!passwordEncoder.matches(rawPassword, e.getPassword()))
          throw new RuntimeException("Invalid password");
        yield new LoginResponse(
            e.getEditorId(),
            e.getName(),
            e.getEmail(),
            "EDITOR",
            "Login successful as EDITOR");
      }

      case "WRITER" -> {
        Writer w = writerRepo.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Writer not found"));
        if (!passwordEncoder.matches(rawPassword, w.getPassword()))
          throw new RuntimeException("Invalid password");
        yield new LoginResponse(
            w.getWriterId(), // ← correct field
            w.getName(),
            w.getEmail(),
            "WRITER",
            "Login successful as WRITER");
      }

      default -> throw new RuntimeException("Invalid role");
    };
  }
}