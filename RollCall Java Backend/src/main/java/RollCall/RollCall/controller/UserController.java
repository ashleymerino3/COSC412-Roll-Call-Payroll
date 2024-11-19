package RollCall.RollCall.controller;

import RollCall.RollCall.model.UserModel;
import RollCall.RollCall.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * UserController coordinates between the js frontend and the UserService class by handling
 * JS API and HTTP calls.
 * The @RestController annotation is for RESTful application reference. Part of
 * the Spring Boot framework for automatically scanning and linking components together.
 */
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Used by JS frontend fetch([server]./users/${userId}) which returns a
     * UserModel converted into JSON for use in populating the user profile.
     * @param userId
     * @return
     */
    @GetMapping("/{userId}")
    public ResponseEntity<UserModel> getUserProfile(@PathVariable Long userId) {
        try {
            UserModel userModel = userService.getUserById(userId);
            return ResponseEntity.ok(userModel);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Used by JS frontend fetch([server]./users/login) which passes username and
     * password as an 'application/json' object (known here as RequestBody).
     * The function then calls the validateCredentials() method to compare the
     * loginRequest information against the database. If there's a match, an HTTP
     * 'ResponseEntity.ok' and the userId is returned to the frontend.
     * @param loginRequest
     * @return
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            boolean success = userService.validateCredentials(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
            );

            if (success) {
                Long userId = userService.getUserIdByUsername(loginRequest.getUsername());
                return ResponseEntity.ok(userId);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
}


/*
-- Related js methods --

PROFILE INFORMATION FETCH:
async function getUser(userId) {
	const response = await fetch(`http://localhost:8080/users/${userId}`);
	const data = await response.json();
	setUser([data]);
}


LOGIN REQUEST:


async function login(username, password) {
    const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
            const userId = await response.text(); // Get the userId from the response
            console.log("Login successful.");
            setUserId(userId); // Store the userId in state or local storage
        } else if (response.status === 401) {
            console.error("Invalid credentials");
        } else {
            console.error("An error occurred during login");
        }
    } catch (error) {
        console.error("Network error:", error);
    }
}

*/
