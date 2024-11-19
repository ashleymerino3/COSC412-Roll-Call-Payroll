package RollCall.RollCall;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class DummyPasswords {

    private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static String hashPassword(String plainPassword) {
        return passwordEncoder.encode(plainPassword);
    }

    public static void main(String[] args) {

        String plainPassword = "pbobbin";
        String hashedPassword = hashPassword(plainPassword);
        System.out.println("Plain Password: " + plainPassword);
        System.out.println("Hashed Password: " + hashedPassword);
    }
}

/*



*/