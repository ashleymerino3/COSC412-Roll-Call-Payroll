package RollCall.RollCall.service;

import RollCall.RollCall.model.UserModel;
import RollCall.RollCall.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * UserService processes UserController calls to handle user account creation,
 * management, and the login service.
 */
@Service
public class UserService {

    //UserRepository handles query logic for the Users database table.
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * createUser takes a new UserModel object and passes its data into a new
     * row in the Users database table, via 'userRepository.save(user)'. It also Hashes the raw password entered
     * by the user to encrypt the password for more secure storage.
     * @param user
     * @return (Used internally by the repository, sometimes data is drastically changed for database storage)
     */
    public UserModel createUser(UserModel user) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /**
     * validateCredentials uses the accessory class LoginRequest at the Controller level to pass
     * the username and raw password into a Hash function to validate a password match with the
     * database. This is a boolean method to confirm the match before the Controller calls another
     * method to get the UserId.
     * @param username
     * @param rawPassword
     * @return boolean
     */
    public boolean validateCredentials(String username, String rawPassword) {
        UserModel user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    /**
     * getUserById and getUserIdByUsername are calls to the UserRepository to retrieve
     * data using inputs of userId or username respectively.
     * @return UserModel or Long(userId) respectively.
     */

    public UserModel getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Long getUserIdByUsername(String username){
        UserModel user = userRepository.findByUsername(username).
                orElseThrow(() -> new RuntimeException("User not found."));
        return user.getUserId();
    }
}
