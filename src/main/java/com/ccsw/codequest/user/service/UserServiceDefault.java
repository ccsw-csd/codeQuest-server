package com.ccsw.codequest.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ccsw.codequest.config.security.UserInfoDto;
import com.ccsw.codequest.user.dataaccess.UserRepository;
import com.ccsw.codequest.user.model.User;

/**
 * @author ccsw
 *
 */

@Service
@Transactional(readOnly = true)
public class UserServiceDefault implements UserService {

    @Autowired
    UserRepository userRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    public User getByUsername(String username) {

        return this.userRepository.getByUsername(username);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional(readOnly = false)
    public void createUser(UserInfoDto userInfo) {

        User user = getByUsername(userInfo.getUsername());

        if (user == null) {
            user = new User();
            user.setUsername(userInfo.getUsername());
            user.setFirstName(userInfo.getFirstName());
            user.setLastName(userInfo.getLastName());
            user.setEmail(userInfo.getMail());

            userRepository.save(user);
        }

    }

}
