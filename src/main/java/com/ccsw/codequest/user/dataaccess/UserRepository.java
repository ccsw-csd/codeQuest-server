package com.ccsw.codequest.user.dataaccess;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.ccsw.codequest.user.model.User;

import java.util.List;

/**
 * @author ccsw
 *
 */
public interface UserRepository extends CrudRepository<User, Long>, JpaSpecificationExecutor<User> {

    /**
     * Recupera un usuario con su username
     *
     * @param username
     * @return
     * @throws Exception
     */
    User getByUsername(String username);

}
