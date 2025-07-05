package com.shazam.shazam_backend.controller;

import com.shazam.shazam_backend.Repository.SongRepository;
import com.shazam.shazam_backend.model.Song;
import com.shazam.shazam_backend.service.AudioFingerprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/audio")
public class AudioUploadController {

    private final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads";

    @Autowired
    private SongRepository songRepository;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadAudio(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }

            // Ensure upload directory exists
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) uploadDir.mkdirs();

            // Save the file to disk
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            File destination = new File(uploadDir, filename);
            file.transferTo(destination);

            // Extract fingerprint using TarsosDSP
            String fingerprint = AudioFingerprintService.extractFingerprint(destination);

            // Save song to database
            Song song = new Song();
            song.setTitle(filename);
            song.setFingerprintHash(fingerprint);
            song.setArtist("Unknown"); // or set dynamically
            song.setAlbum("Uploaded Songs");
            song.setGenre("Unknown");
            song.setDuration(0); // Optional: use Tarsos to calculate duration

            songRepository.save(song);

            return ResponseEntity.ok("✅ Uploaded & saved: " + filename);

        } catch (IOException | UnsupportedAudioFileException e) {
            return ResponseEntity.internalServerError().body("❌ Failed to upload: " + e.getMessage());
        }
    }



    @PostMapping("/match")
    public ResponseEntity<?> matchSong(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }

            // Save to temp location
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) uploadDir.mkdirs();
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            File tempFile = new File(uploadDir, filename);
            file.transferTo(tempFile);

            // Extract fingerprint
            String uploadedFingerprint = AudioFingerprintService.extractFingerprint(tempFile);

            // Search DB
            Song match = songRepository.findAll().stream()
                    .filter(s -> uploadedFingerprint.equals(s.getFingerprintHash()))
                    .findFirst()
                    .orElse(null);

            if (match != null) {
                return ResponseEntity.ok("🎵 Match found: " + match.getTitle() + " by " + match.getArtist());
            } else {
                return ResponseEntity.status(404).body("❌ No match found.");
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}
