package com.abdellah.collegepaymentmanagement.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.sql.Array;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // To notify the security that we will use a customizer configuration (Loot at the line 39)
        http.cors(Customizer.withDefaults());
        http.csrf(AbstractHttpConfigurer::disable);
        // Spring by default denied the frames ana here we need to
        // disable the framer to get access to all the frames on the H2-console
        http.headers(h->h.frameOptions(fo->fo.disable()));
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.authorizeHttpRequests(ar->ar.requestMatchers("/api/**","/h2-console/**").permitAll());
        http.authorizeHttpRequests(ar->ar.anyRequest().authenticated());
        return http.build();

    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        // These are the headers that the client (browser) is allowed to include
        // in its request when making a cross-origin request.
        configuration.setAllowedHeaders(Arrays.asList("*"));
        // These are the headers that the server allows the browser to read from the response.
        configuration.setExposedHeaders(Arrays.asList("*"));

        // Create a CORS configuration source and apply the same CORS rules (configuration)
        // to all endpoints in the application.
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}
