package pl.medical.visits.controller;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.medical.visits.exception.NotUniqueValueException;
import pl.medical.visits.exception.ValidationException;
import pl.medical.visits.model.dto.DoctorDTO;
import pl.medical.visits.model.dto.PatientDTO;
import pl.medical.visits.model.entity.user.Patient;
import pl.medical.visits.service.WebService;

import java.util.Map;

@RestController("/auth")
@AllArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class WebAuthController {
    private WebService webService;

    @GetMapping("/doctor/patients")
    public ResponseEntity<Page<PatientDTO>> getPatientsWithPaging(@RequestParam Map<String, String> reqParams) {
        return ResponseEntity.status(HttpStatus.OK).body(webService.getPatients(reqParams));
    }

    @GetMapping("/doctor/doctors")
    public ResponseEntity<Page<DoctorDTO>> getDoctorsWithPaging(@RequestParam Map<String, String> reqParams) {
        return ResponseEntity.status(HttpStatus.OK).body(webService.getDoctors(reqParams));
    }

    @GetMapping("/doctor/doctorsPatients")
    public ResponseEntity<Page<PatientDTO>> getAllPatientsForDoctorId(
            @NotNull @RequestParam Map<String, String> reqParams
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(webService.getAllPatientsForDoctorId(reqParams));
    }

    @GetMapping("/patient/allPatientsData")
    public ResponseEntity<Patient> getAllPatientData(@RequestParam long id, Authentication auth) {
        return ResponseEntity.status(HttpStatus.OK).body(webService.getAllPatientsData(auth.getName(), id));
    }

    @PatchMapping("/patient/updatePatient")
    public ResponseEntity<String > updateDataForUser(
            @RequestBody Patient patient, Authentication auth
    ) throws NotUniqueValueException, ValidationException {
        webService.updatePatientData(auth.getName(), patient);
        return ResponseEntity.status(HttpStatus.OK).body("Patient's data has been updated");
    }
}
