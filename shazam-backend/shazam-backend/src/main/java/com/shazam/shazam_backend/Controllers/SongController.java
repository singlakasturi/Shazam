package com.shazam.shazam_backend.Controllers;

import com.shazam.shazam_backend.model.Song;
import com.shazam.shazam_backend.Repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = "*") // allow React frontend
public class SongController {

    @Autowired
    private SongRepository songRepository;

    @PostMapping
    public ResponseEntity<Song> addSong(@RequestBody Song song) {
        Song savedSong = songRepository.save(song);
        return new ResponseEntity<>(savedSong, HttpStatus.CREATED);
    }

    // Optional: for listing songs
    @GetMapping
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }
}
