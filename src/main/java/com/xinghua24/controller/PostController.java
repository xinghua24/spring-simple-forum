package com.xinghua24.controller;

import com.xinghua24.model.Post;
import com.xinghua24.repo.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/posts")
@Slf4j
class PostController {

    @Autowired
    PostRepository repository;

    @GetMapping
    public ResponseEntity<List<Post>> getRecentPosts() {
        log.info("handling get all posts");
        try {
            List<Post> items = new ArrayList<Post>();

            repository.findRecentPosts().forEach(items::add);

            return new ResponseEntity<>(items, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<Post> getById(@PathVariable("id") String id) {
        log.info("handling get post by id");
        Optional<Post> existingItemOptional = repository.findById(id);

        if (existingItemOptional.isPresent()) {
            return new ResponseEntity<>(existingItemOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Post> create(@RequestBody Post item) {
        log.info("handling create post");
        try {
            if(item.getTitle() == null || item.getTitle().isBlank()
                    || item.getContent() == null || item.getContent().isBlank()
                    || item.getContent().length() > 5000) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            if(item.getId() == null) {
                item.setId(UUID.randomUUID().toString());
            }
            item.setCreated(ZonedDateTime.now());
            item.setUpdated(ZonedDateTime.now());
            Post savedItem = repository.save(item);
            return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<Post> update(@PathVariable("id") String id, @RequestBody Post item) {
        log.info("handling update post");
        Optional<Post> existingItemOptional = repository.findById(id);
        if (existingItemOptional.isPresent()) {
            Post post = existingItemOptional.get();
            post.setTitle(item.getTitle())
                    .setContent(item.getContent())
                    .setUpdated(ZonedDateTime.now());
            repository.save(post);
            return new ResponseEntity<>(repository.save(post), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        log.info("handling delete post");
        try {
            repository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }
}