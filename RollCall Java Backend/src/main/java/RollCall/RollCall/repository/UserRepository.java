package RollCall.RollCall.repository;

import RollCall.RollCall.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {

    @Query(value = "select * from users where username = :username", nativeQuery = true)
    Optional<UserModel> findByUsername(@Param("username") String username);

    @Query(value = "select * from users where userid = :userid", nativeQuery = true)
    Optional<UserModel> findByUserId(@Param("userid") Long userid);

    @Query(value = "select * from users where employerid = :employerid", nativeQuery = true)
    List<UserModel> findByEmployerID(@Param("employerid") Long employerid);

}

/*
 * UserRepository:
 * This repository provides methods to interact with the 'users' table in the database.
 * It extends JpaRepository to inherit common CRUD operations like save, findById, delete, and findAll.
 * Custom methods like findByUsername and findByManagerAccessTrue allow filtering users by specific criteria.
 * This repository is essential for managing user data in the application.
 */
