package com.example.backend.config;

import com.example.backend.model.Editor;
import com.example.backend.repository.EditorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

  private final EditorRepository editorRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) {
    if (editorRepository.findByEmail("malithdarshana2000@gmail.com").isEmpty()) {
      Editor editor = new Editor();
      editor.setName("Malith Darshana");
      editor.setNic("200012345678");
      editor.setEmail("malithdarshana2000@gmail.com");
      editor.setPassword(passwordEncoder.encode("Darshana9@"));
      editorRepository.save(editor);
      System.out.println("✅ Default editor created.");
    } else {
      System.out.println("ℹ️ Editor already exists.");
    }
  }
}
