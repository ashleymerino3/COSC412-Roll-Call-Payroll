package RollCall.RollCall.repository;

import RollCall.RollCall.model.ShiftModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ShiftRepository extends JpaRepository<ShiftModel, Long> {

    // Find all shifts for a specific user by their user ID
    List<ShiftModel> findByUserModelUserId(Long userId);

    // Find all shifts that started after a specific timestamp
    List<ShiftModel> findByStartTimeStampAfter(LocalDateTime startTime);

    // Find all shifts between two timestamps
    List<ShiftModel> findByStartTimeStampBetween(LocalDateTime startTime, LocalDateTime endTime);
}

/*
 * ShiftRepository:
 * - Manages database operations for the "shifts" table via JpaRepository.
 * - Provides CRUD operations and custom query methods:
 *   - `findByUserModelUserId(Long userId)`: Fetch all shifts for a user.
 *   - `findByStartTimeStampAfter(LocalDateTime startTime)`: Fetch shifts starting after a specific time.
 *   - `findByStartTimeStampBetween(LocalDateTime startTime, LocalDateTime endTime)`: Fetch shifts within a time range.
 */
