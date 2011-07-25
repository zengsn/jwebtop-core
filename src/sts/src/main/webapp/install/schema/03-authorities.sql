-- Table: authorities

-- DROP TABLE authorities;

CREATE TABLE authorities
(
  uid_ character varying(10) NOT NULL,
  authority_ character varying(10) NOT NULL,
  CONSTRAINT authorities_username_fkey FOREIGN KEY (uid_)
      REFERENCES users (uid_) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
