package com.ccsw.codequest.config.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
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

    /**
     * Comprueba si el usuario tiene el rol indicado
     * @param role
     * @return
     */
    public static boolean hasRole(String role) {

        Collection<? extends GrantedAuthority> roles = SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        if (roles == null || roles.size() == 0)
            return false;

        for (GrantedAuthority authority : roles) {
            if (authority.getAuthority().equalsIgnoreCase(role))
                return true;
        }

        return false;

    }
}
