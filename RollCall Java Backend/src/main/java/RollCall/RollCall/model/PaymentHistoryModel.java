package RollCall.RollCall.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment_history") // Maps to the "payment_history" table
public class PaymentHistoryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generated identity column
    @Column(name = "payment_id", nullable = false, unique = true)
    private Long paymentId;

    @ManyToOne // Foreign key relationship to the User table
    @JoinColumn(name = "userid", nullable = false, foreignKey = @ForeignKey(name = "payment_history_userid_fkey"))
    private UserModel userModel;

    @ManyToOne // Foreign key relationship to the Shift table
    @JoinColumn(name = "shift_id", nullable = false, foreignKey = @ForeignKey(name = "payment_history_shift_id_fkey"))
    private ShiftModel shiftModel;

    @Column(name = "payment_date") // Maps to the "payment_date" column
    private LocalDateTime paymentDate;

    @Column(name = "payment_amount", precision = 9, scale = 2) // Maps to the "payment_amount" column
    private BigDecimal paymentAmount;

    // Getters and setters

    public Long getPaymentId() {
        return paymentId;
    }
    // No setPaymentId because the database uses an auto-fill identity function for this column.
    // It should never be set manually.

    public UserModel getUserModel() {
        return userModel;
    }
    public void setUserModel(UserModel userModel) {
        this.userModel = userModel;
    }

    public ShiftModel getShiftModel() {
        return shiftModel;
    }
    public void setShiftModel(ShiftModel shiftModel) {
        this.shiftModel = shiftModel;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }
    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public BigDecimal getPaymentAmount() {
        return paymentAmount;
    }
    public void setPaymentAmount(BigDecimal paymentAmount) {
        this.paymentAmount = paymentAmount;
    }
}

/*
 * PaymentHistoryModel:
 * - Represents the "payment_history" table in the database.
 * - Maps columns in the database table to fields in this class.
 * - Establishes relationships with UserModel and ShiftModel via foreign keys.
 * - Includes details about the payment, such as the amount and date.
 * - The primary key (paymentId) is auto-generated and should never be set manually.
 */
