--
-- PostgreSQL database dump
--

-- Started on 2010-06-08 00:41:19

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

--
-- TOC entry 314 (class 2612 OID 16386)
-- Name: plpgsql; Type: PROCEDURAL LANGUAGE; Schema: -; Owner: postgres
--

CREATE PROCEDURAL LANGUAGE plpgsql;


ALTER PROCEDURAL LANGUAGE plpgsql OWNER TO postgres;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 1505 (class 1259 OID 41682)
-- Dependencies: 3
-- Name: configurations; Type: TABLE; Schema: public; Owner: jwebtop; Tablespace: 
--

CREATE TABLE configurations (
    key_ character varying(64) NOT NULL,
    name_ character varying(64),
    value_ character varying(128),
    description_ character varying(256)
);


ALTER TABLE public.configurations OWNER TO jwebtop;

--
-- TOC entry 1504 (class 1259 OID 41667)
-- Dependencies: 3
-- Name: profile_webware_link; Type: TABLE; Schema: public; Owner: jwebtop; Tablespace: 
--

CREATE TABLE profile_webware_link (
    pwid_ character varying(64) NOT NULL,
    pid_ character varying(64),
    wid_ character varying(64)
);


ALTER TABLE public.profile_webware_link OWNER TO jwebtop;

--
-- TOC entry 1503 (class 1259 OID 41657)
-- Dependencies: 3
-- Name: profiles; Type: TABLE; Schema: public; Owner: jwebtop; Tablespace: 
--

CREATE TABLE profiles (
    pid_ character varying(64) NOT NULL,
    uid_ character varying(64),
    updatedtime_ timestamp with time zone
);


ALTER TABLE public.profiles OWNER TO jwebtop;

--
-- TOC entry 1502 (class 1259 OID 41652)
-- Dependencies: 3
-- Name: users; Type: TABLE; Schema: public; Owner: jwebtop; Tablespace: 
--

CREATE TABLE users (
    uid_ character varying(64) NOT NULL,
    username_ character varying(64),
    password_ character varying(64),
    email_ character varying(128),
    createdtime_ timestamp with time zone,
    updatedtime_ timestamp with time zone
);


ALTER TABLE public.users OWNER TO jwebtop;

--
-- TOC entry 1501 (class 1259 OID 41642)
-- Dependencies: 1783 1784 3
-- Name: webwares; Type: TABLE; Schema: public; Owner: jwebtop; Tablespace: 
--

CREATE TABLE webwares (
    wid_ character varying(64) NOT NULL,
    name_ character varying(64) NOT NULL,
    author_ character varying(64) NOT NULL,
    release_ character varying(32) NOT NULL,
    screen_ character varying(256),
    logo_ character varying(256),
    icon_ character varying(256),
    description_ text,
    status_ smallint DEFAULT 0 NOT NULL,
    versions_ text NOT NULL,
    currentversion_ character varying(64) NOT NULL,
    jsclass_ character varying(256) NOT NULL,
    springcontext_ character varying(256),
    createdtime_ timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.webwares OWNER TO jwebtop;

--
-- TOC entry 1794 (class 2606 OID 41689)
-- Dependencies: 1505 1505
-- Name: pk_key; Type: CONSTRAINT; Schema: public; Owner: jwebtop; Tablespace: 
--

ALTER TABLE ONLY configurations
    ADD CONSTRAINT pk_key PRIMARY KEY (key_);


--
-- TOC entry 1790 (class 2606 OID 41661)
-- Dependencies: 1503 1503
-- Name: pk_pid; Type: CONSTRAINT; Schema: public; Owner: jwebtop; Tablespace: 
--

ALTER TABLE ONLY profiles
    ADD CONSTRAINT pk_pid PRIMARY KEY (pid_);


--
-- TOC entry 1792 (class 2606 OID 41671)
-- Dependencies: 1504 1504
-- Name: pk_pwlink; Type: CONSTRAINT; Schema: public; Owner: jwebtop; Tablespace: 
--

ALTER TABLE ONLY profile_webware_link
    ADD CONSTRAINT pk_pwlink PRIMARY KEY (pwid_);


--
-- TOC entry 1788 (class 2606 OID 41656)
-- Dependencies: 1502 1502
-- Name: pk_uid; Type: CONSTRAINT; Schema: public; Owner: jwebtop; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT pk_uid PRIMARY KEY (uid_);


--
-- TOC entry 1786 (class 2606 OID 41651)
-- Dependencies: 1501 1501
-- Name: pk_webwareid_; Type: CONSTRAINT; Schema: public; Owner: jwebtop; Tablespace: 
--

ALTER TABLE ONLY webwares
    ADD CONSTRAINT pk_webwareid_ PRIMARY KEY (wid_);


--
-- TOC entry 1796 (class 2606 OID 41672)
-- Dependencies: 1504 1789 1503
-- Name: fk_pid; Type: FK CONSTRAINT; Schema: public; Owner: jwebtop
--

ALTER TABLE ONLY profile_webware_link
    ADD CONSTRAINT fk_pid FOREIGN KEY (pid_) REFERENCES profiles(pid_);


--
-- TOC entry 1795 (class 2606 OID 41662)
-- Dependencies: 1787 1503 1502
-- Name: fk_uid; Type: FK CONSTRAINT; Schema: public; Owner: jwebtop
--

ALTER TABLE ONLY profiles
    ADD CONSTRAINT fk_uid FOREIGN KEY (uid_) REFERENCES users(uid_);


--
-- TOC entry 1797 (class 2606 OID 41677)
-- Dependencies: 1501 1504 1785
-- Name: fk_wid; Type: FK CONSTRAINT; Schema: public; Owner: jwebtop
--

ALTER TABLE ONLY profile_webware_link
    ADD CONSTRAINT fk_wid FOREIGN KEY (wid_) REFERENCES webwares(wid_);


--
-- TOC entry 1802 (class 0 OID 0)
-- Dependencies: 3
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2010-06-08 00:41:20

--
-- PostgreSQL database dump complete
--

