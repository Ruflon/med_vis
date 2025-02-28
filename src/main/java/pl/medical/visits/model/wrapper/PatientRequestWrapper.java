package pl.medical.visits.model.wrapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.medical.visits.model.entity.user.Doctor;
import pl.medical.visits.model.entity.user.Patient;
import pl.medical.visits.model.entity.user.UserAddressData;
import pl.medical.visits.model.entity.user.UserLoginData;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientRequestWrapper {
    private Patient patient;
    private UserLoginData loginData;
    private UserAddressData addressData;
    private Doctor assignedDoctor;
}
