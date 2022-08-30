package com.ccsw.codequest.user;

import com.ccsw.codequest.config.security.UserInfoDto;
import com.ccsw.codequest.user.model.User;

/**
 * @author ccsw
 *
 */
public interface UserService {

    /**
     * Recupera un usuario con su username
     *
     * @param username
     * @return
     * @throws Exception
     */
    User getByUsername(String username);

    /**
     * Crea el usuario si no existe
     * @param userInfo
     */
    void createUser(UserInfoDto userInfo);

}
