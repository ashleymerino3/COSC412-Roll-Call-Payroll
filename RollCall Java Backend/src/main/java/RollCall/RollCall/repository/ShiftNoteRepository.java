package RollCall.RollCall.repository;

import RollCall.RollCall.model.ShiftNoteModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShiftNoteRepository extends JpaRepository<ShiftNoteModel, Long> {

    // Find all notes for a specific shift
    List<ShiftNoteModel> findByShiftModelShiftId(Long shiftId);
}

/*
 * ShiftNoteRepository:
 * This repository is used to manage the 'shift_notes' table.
 * It inherits CRUD methods from JpaRepository for adding, finding, and deleting shift notes.
 * Custom methods like findByShiftShiftId enable retrieving notes associated with specific shifts.
 * This repository supports attaching and managing notes for work shifts.
 */
