package RollCall.RollCall.repository;

import RollCall.RollCall.model.PaymentHistoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentHistoryRepository extends JpaRepository<PaymentHistoryModel, Long> {

    // Find payment history by shift ID
    List<PaymentHistoryModel> findByShiftModelShiftId(Long shiftId);

    // Find payment history by user ID
    List<PaymentHistoryModel> findByUserModelUserId(Long userId);
}
