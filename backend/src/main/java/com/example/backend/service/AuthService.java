package com.example.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.model.Editor;
import com.example.backend.model.Reader;
import com.example.backend.model.Writer;
import com.example.backend.repository.EditorRepository;
import com.example.backend.repository.ReaderRepository;
import com.example.backend.repository.WriterRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final ReaderRepository readerRepo;
  private final EditorRepository editorRepo;
  private final WriterRepository writerRepo;
  private final PasswordEncoder passwordEncoder;

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
      case "EDITOR" -> {
        Editor editor = new Editor();
        editor.setName(request.getName());
        editor.setEmail(request.getEmail());
        editor.setPassword(encoded);
        editor.setNic(request.getNic());
        editorRepo.save(editor);
      }
      case "WRITER" -> {
        Writer writer = new Writer();
        writer.setName(request.getName());
        writer.setEmail(request.getEmail());
        writer.setPassword(encoded);
        writer.setNic(request.getNic());
        writerRepo.save(writer);
      }
      default -> throw new RuntimeException("Invalid role: " + request.getRole());
    }
    return "User registered successfully!";
  }

  public String login(LoginRequest request) {
    String role = request.getRole().toUpperCase();
    String rawPassword = request.getPassword();

    return switch (role) {
      case "READER" -> {
        Reader r = readerRepo.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Reader not found"));
        if (!passwordEncoder.matches(rawPassword, r.getPassword()))
          throw new RuntimeException("Invalid password");
        yield "Login successful as READER";
      }
      case "EDITOR" -> {
        Editor e = editorRepo.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Editor not found"));
        if (!passwordEncoder.matches(rawPassword, e.getPassword()))
          throw new RuntimeException("Invalid password");
        yield "Login successful as EDITOR";
      }
      case "WRITER" -> {
        Writer w = writerRepo.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Writer not found"));
        if (!passwordEncoder.matches(rawPassword, w.getPassword()))
          throw new RuntimeException("Invalid password");
        yield "Login successful as WRITER";
      }
      default -> throw new RuntimeException("Invalid role");
    };
  }
}
