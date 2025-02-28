package pl.medical.visits.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.medical.visits.model.dto.DoctorDTO;
import pl.medical.visits.model.dto.PatientDTO;
import pl.medical.visits.exception.NotUniqueValueException;
import pl.medical.visits.exception.ValidationException;
import pl.medical.visits.model.response.AuthenticationResponse;
import pl.medical.visits.model.wrapper.DoctorRequestWrapper;
import pl.medical.visits.model.wrapper.PatientRequestWrapper;
import pl.medical.visits.model.wrapper.UserLoginRequestWrapper;
import pl.medical.visits.service.WebService;


@RestController("/noAuth")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class WebController {

    private WebService webService;

    @PostMapping("/registerPatient")
    public ResponseEntity<AuthenticationResponse> registerPatient(@RequestBody PatientRequestWrapper requestWrapper)
            throws ValidationException, NotUniqueValueException {
        return ResponseEntity.status(HttpStatus.CREATED).body(webService.registerPatient(requestWrapper));
    }

    @PostMapping("/registerDoctor")
    public ResponseEntity<AuthenticationResponse> registerDoctor(@RequestBody DoctorRequestWrapper requestWrapper)
            throws NotUniqueValueException, ValidationException {
        return ResponseEntity.status(HttpStatus.CREATED).body(webService.registerDoctor(requestWrapper));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginUser(@RequestBody UserLoginRequestWrapper userLogin) {
        return ResponseEntity.status(HttpStatus.OK).body(webService.loginUser(userLogin));
    }
}
