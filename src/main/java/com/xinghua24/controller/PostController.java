package com.xinghua24.controller;

import com.xinghua24.model.Post;
import com.xinghua24.repo.PostRepository;
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
@RequestMapping("/posts")
class PostController {

    @Autowired
    PostRepository repository;

    @GetMapping
    public ResponseEntity<List<Post>> getAll() {
        try {
            List<Post> items = new ArrayList<Post>();

            repository.findAll().forEach(items::add);

            return new ResponseEntity<>(items, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<Post> getById(@PathVariable("id") String id) {
        Optional<Post> existingItemOptional = repository.findById(id);

        if (existingItemOptional.isPresent()) {
            return new ResponseEntity<>(existingItemOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Post> create(@RequestBody Post item) {
        try {
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
        try {
            repository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }
}