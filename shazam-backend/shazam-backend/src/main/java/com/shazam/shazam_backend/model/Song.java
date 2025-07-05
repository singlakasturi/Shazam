package com.shazam.shazam_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "song") // Optional: forces lowercase table name
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String artist;
    private String album;
    private int duration; // in seconds
    private String genre;

    @Column(length = 1000)
    private String fingerprintHash;

    public Song() {}

    public Song(String title, String artist, String album, int duration, String genre) {
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.duration = duration;
        this.genre = genre;
    }

    public String getGenre() {
        return genre;
    }
    public String getFingerprintHash() {
        return fingerprintHash;
    }


    public String getArtist() {
        return artist;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public int getDuration() {
        return duration;
    }

    public String getAlbum() {
        return album;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFingerprintHash(String fingerprintHash) {
        this.fingerprintHash = fingerprintHash;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
