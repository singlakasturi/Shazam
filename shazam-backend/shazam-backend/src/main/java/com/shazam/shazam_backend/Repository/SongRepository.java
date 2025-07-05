package com.shazam.shazam_backend.Repository;

import com.shazam.shazam_backend.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {
    // Add custom queries here later
}
