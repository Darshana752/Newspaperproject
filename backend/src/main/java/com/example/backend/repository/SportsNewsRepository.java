
package com.example.backend.repository;

import com.example.backend.model.SportsNews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SportsNewsRepository extends JpaRepository<SportsNews, Long> {
}