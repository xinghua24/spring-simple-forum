package com.xinghua24.repo;

import com.xinghua24.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, String> {

    @Query(value = "select * from post order by created desc limit 0,100", nativeQuery = true)
    List<Post> findRecentPosts();
}
