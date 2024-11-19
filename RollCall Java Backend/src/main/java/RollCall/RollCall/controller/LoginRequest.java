package RollCall.RollCall.controller;

/**
 * Simple accessory class to UserController for holding the username
 * and password from the login page.
 */
public class LoginRequest {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}