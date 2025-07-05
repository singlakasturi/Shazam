package com.shazam.shazam_backend.Services;

import com.shazam.shazam_backend.Repository.SongRepository;
import com.shazam.shazam_backend.model.Song;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SongSeedingService implements CommandLineRunner {

    private final SongRepository songRepository;

    public SongSeedingService(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (songRepository.count() == 0) {
            List<Song> songs = List.of(
                    new Song("Shape of You", "Ed Sheeran", "Divide", 233, "Pop"),
                    new Song("Believer", "Imagine Dragons", "Evolve", 204, "Rock"),
                    new Song("Blinding Lights", "The Weeknd", "After Hours", 200, "Synthpop"),
                    new Song("Levitating", "Dua Lipa", "Future Nostalgia", 203, "Pop"),
                    new Song("Bad Guy", "Billie Eilish", "When We All Fall Asleep...", 194, "Alternative"),
                    new Song("Senorita", "Shawn Mendes & Camila Cabello", "Single", 190, "Pop")
            );

            songRepository.saveAll(songs);
            System.out.println("✅ Seeded initial songs into the database.");
        } else {
            System.out.println("ℹ️ Songs already exist. Skipping seeding.");
        }
    }
}
