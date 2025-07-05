package com.shazam.shazam_backend.service;

import be.tarsos.dsp.AudioDispatcher;
import be.tarsos.dsp.AudioEvent;
import be.tarsos.dsp.AudioProcessor;
import be.tarsos.dsp.io.jvm.AudioDispatcherFactory;
import be.tarsos.dsp.mfcc.MFCC;

import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.File;
import java.io.IOException;
import java.util.Arrays;

public class AudioFingerprintService {

    public static String extractFingerprint(File audioFile) throws IOException, UnsupportedAudioFileException {
        AudioDispatcher dispatcher = AudioDispatcherFactory.fromFile(audioFile, 1024, 512);
        MFCC mfcc = new MFCC(1024, 44100, 13, 20, 300, 3000);

        final StringBuilder sb = new StringBuilder();

        dispatcher.addAudioProcessor(mfcc);
        dispatcher.addAudioProcessor(new AudioProcessor() {
            @Override
            public boolean process(AudioEvent audioEvent) {
                float[] mfccs = mfcc.getMFCC();
                sb.append(Arrays.toString(mfccs));
                return true;
            }

            @Override
            public void processingFinished() {
                // no cleanup needed
            }
        });

        dispatcher.run();

        // Simplify fingerprint by hashing the MFCC output
        return Integer.toHexString(sb.toString().hashCode());
    }
}
