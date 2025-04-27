package com.collegemanai.repository;

import com.collegemanai.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.collegemanai.model.Reels;

import java.util.List;

public interface ReelRepository extends JpaRepository<Reels, Integer>{
    List<Reels> findByUser(User user);
}
