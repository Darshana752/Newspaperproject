package com.example.backend.repository;

import com.example.backend.model.ForeignNews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForeignNewsRepository extends JpaRepository<ForeignNews, Long> {
}
