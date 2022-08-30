package com.ccsw.codequest.config.security;

import org.springframework.security.core.context.SecurityContextHolder;

/**
 * @author ccsw
 *
 */
public class UserUtils {

    /**
     * @return UserDetailsJWTDto
     */
    public static UserInfoDto getUserDetails() {

        return (UserInfoDto) SecurityContextHolder.getContext().getAuthentication().getDetails();
    }

}
