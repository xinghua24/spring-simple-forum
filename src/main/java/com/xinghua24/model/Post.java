package com.xinghua24.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.ZonedDateTime;

@Entity
@Data
@Accessors(chain = true)
public class Post {
    @Id
    @Column(name = "ID", nullable = false, length = 36)
    private String id;

    @Column(name = "TITLE", length = 255)
    private String title;

    @Column(name = "CONTENT", columnDefinition ="text" )
    private String content;

    @Column(name = "CREATED")
    private ZonedDateTime created;

    @Column(name = "UPDATED")
    private ZonedDateTime updated;
}
