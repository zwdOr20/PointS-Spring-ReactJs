package com.points.connect.controller;

import com.points.connect.exception.ResourceNotFoundException;
import com.points.connect.model.*;
import com.points.connect.payload.*;
import com.points.connect.repository.*;
import com.points.connect.security.UserPrincipal;
import com.points.connect.security.CurrentUser;

import java.util.List;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    //private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    
    @GetMapping("/users")
    public List<User> getUser(){
    	return userRepository.findAll();
    }
    
    @DeleteMapping("/user/{username}/delete")
    @Transactional
    public ResponseEntity<?> delete(@PathVariable String username) {
        if (!userRepository.findByUsername(username).isPresent()) {
            ResponseEntity.badRequest().build();
        }
        userRepository.deleteByUsername(username);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/user/me")
    @Secured({"ROLE_GR_COMPTE", "ROLE_CDG", "ROLE_FRANCHISE", "ROLE_ADMIN"})
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName(), currentUser.getRole());
        return userSummary;
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getName());
        
        return userProfile;
    }
    
    @GetMapping("/roles")
    public List<Role> getRoles() {
    	return roleRepository.findAll();
    }
  

}