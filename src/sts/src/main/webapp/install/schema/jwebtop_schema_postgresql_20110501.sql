--
-- PostgreSQL database dump
--

-- Dumped from database version 9.0.4
-- Dumped by pg_dump version 9.0.4
-- Started on 2011-05-01 19:29:23

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

--
-- TOC entry 338 (class 2612 OID 11574)
-- Name: plpgsql; Type: PROCEDURAL LANGUAGE; Schema: -; Owner: postgres
--

CREATE OR REPLACE PROCEDURAL LANGUAGE plpgsql;


ALTER PROCEDURAL LANGUAGE plpgsql OWNER TO postgres;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 1530 (class 1259 OID 16393)
-- Dependencies: 1823 1824 5
-- Name: apply; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE apply (
    aid_ character varying(64) NOT NULL,
    name_ character varying(64) NOT NULL,
    sex_ character varying(64) DEFAULT '男'::character varying NOT NULL,
    age_ character varying(10) NOT NULL,
    score_ character varying(64) NOT NULL,
    email_ character varying(64) NOT NULL,
    phone_ integer NOT NULL,
    mark_ character varying(10) DEFAULT '否'::character varying NOT NULL
);


ALTER TABLE public.apply OWNER TO postgres;

--
-- TOC entry 1531 (class 1259 OID 16398)
-- Dependencies: 5
-- Name: calendar; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE calendar (
    calendar_id_ integer NOT NULL,
    title_ character varying(255)
);


ALTER TABLE public.calendar OWNER TO postgres;

--
-- TOC entry 1532 (class 1259 OID 16401)
-- Dependencies: 5 1531
-- Name: calendar_calendar_id__seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE calendar_calendar_id__seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.calendar_calendar_id__seq OWNER TO postgres;

--
-- TOC entry 1885 (class 0 OID 0)
-- Dependencies: 1532
-- Name: calendar_calendar_id__seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE calendar_calendar_id__seq OWNED BY calendar.calendar_id_;


--
-- TOC entry 1533 (class 1259 OID 16403)
-- Dependencies: 5
-- Name: calendar_event; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE calendar_event (
    event_id_ integer NOT NULL,
    title_ character varying(255),
    starttime_ timestamp(6) without time zone,
    endtime_ timestamp(6) without time zone,
    location_ character varying(255),
    note_ character varying(255),
    url_ character varying(255),
    allday_ boolean,
    reminder_ character varying(255),
    isnew_ boolean,
    user_id_ character varying(255) NOT NULL,
    calendar_id_ integer NOT NULL
);


ALTER TABLE public.calendar_event OWNER TO postgres;

--
-- TOC entry 1534 (class 1259 OID 16409)
-- Dependencies: 5 1533
-- Name: calendar_event_event_id__seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE calendar_event_event_id__seq
    START WITH 9
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.calendar_event_event_id__seq OWNER TO postgres;

--
-- TOC entry 1886 (class 0 OID 0)
-- Dependencies: 1534
-- Name: calendar_event_event_id__seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE calendar_event_event_id__seq OWNED BY calendar_event.event_id_;


--
-- TOC entry 1535 (class 1259 OID 16411)
-- Dependencies: 5
-- Name: configurations; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE configurations (
    key_ character varying(64) NOT NULL,
    name_ character varying(64),
    value_ character varying(128),
    description_ character varying(256)
);


ALTER TABLE public.configurations OWNER TO postgres;

--
-- TOC entry 1536 (class 1259 OID 16417)
-- Dependencies: 5
-- Name: email_draftbox; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE email_draftbox (
    draft_id_ integer NOT NULL,
    sent_email_ character varying(255),
    title_ character varying(255),
    content_ character varying(255),
    time_ timestamp(6) without time zone,
    email_id_ character varying(255) NOT NULL
);


ALTER TABLE public.email_draftbox OWNER TO postgres;

--
-- TOC entry 1537 (class 1259 OID 16423)
-- Dependencies: 5 1536
-- Name: email_draftbox_draft_id__seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE email_draftbox_draft_id__seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.email_draftbox_draft_id__seq OWNER TO postgres;

--
-- TOC entry 1887 (class 0 OID 0)
-- Dependencies: 1537
-- Name: email_draftbox_draft_id__seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE email_draftbox_draft_id__seq OWNED BY email_draftbox.draft_id_;


--
-- TOC entry 1538 (class 1259 OID 16425)
-- Dependencies: 5
-- Name: email_usersetting; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE email_usersetting (
    setting_id_ integer NOT NULL,
    name_ character varying(255),
    email_address_ character varying(255),
    popservice_ character varying(255),
    stmpservice_ character varying(255),
    active_ boolean,
    epassword_ character varying(255),
    userid_ character varying(255) NOT NULL,
    decription_ character varying(500)
);


ALTER TABLE public.email_usersetting OWNER TO postgres;

--
-- TOC entry 1539 (class 1259 OID 16431)
-- Dependencies: 5 1538
-- Name: email_usersetting_setting_id__seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE email_usersetting_setting_id__seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.email_usersetting_setting_id__seq OWNER TO postgres;

--
-- TOC entry 1888 (class 0 OID 0)
-- Dependencies: 1539
-- Name: email_usersetting_setting_id__seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE email_usersetting_setting_id__seq OWNED BY email_usersetting.setting_id_;


--
-- TOC entry 1540 (class 1259 OID 16433)
-- Dependencies: 5
-- Name: profile_webware_link; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE profile_webware_link (
    pwid_ character varying(64) NOT NULL,
    pid_ character varying(64),
    wid_ character varying(64)
);


ALTER TABLE public.profile_webware_link OWNER TO postgres;

--
-- TOC entry 1541 (class 1259 OID 16436)
-- Dependencies: 5
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE profiles (
    pid_ character varying(64) NOT NULL,
    uid_ character varying(64),
    updatedtime_ timestamp with time zone
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- TOC entry 1542 (class 1259 OID 16439)
-- Dependencies: 5
-- Name: relation; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE relation (
    rid_ character varying(64) NOT NULL,
    name_ character varying(64) NOT NULL,
    email_ character varying(64) NOT NULL,
    mark_ character varying(32) NOT NULL
);


ALTER TABLE public.relation OWNER TO postgres;

--
-- TOC entry 1543 (class 1259 OID 16442)
-- Dependencies: 5
-- Name: save_userfile; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE save_userfile (
    uid_ character varying(64) NOT NULL,
    path_ character varying(255)
);


ALTER TABLE public.save_userfile OWNER TO postgres;

--
-- TOC entry 1544 (class 1259 OID 16445)
-- Dependencies: 5
-- Name: users; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE users (
    uid_ character varying(64) NOT NULL,
    username_ character varying(64),
    password_ character varying(64),
    email_ character varying(128),
    createdtime_ timestamp with time zone,
    updatedtime_ timestamp with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 1545 (class 1259 OID 16448)
-- Dependencies: 1825 1826 5
-- Name: webwares; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
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
    createdtime_ timestamp with time zone DEFAULT now() NOT NULL,
    styles_ text,
    jssources_ text,
    acl_ text
);


ALTER TABLE public.webwares OWNER TO postgres;

--
-- TOC entry 1832 (class 2606 OID 16458)
-- Dependencies: 1533 1533
-- Name: calendar_event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY calendar_event
    ADD CONSTRAINT calendar_event_pkey PRIMARY KEY (event_id_);


--
-- TOC entry 1830 (class 2606 OID 16460)
-- Dependencies: 1531 1531
-- Name: calendar_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY calendar
    ADD CONSTRAINT calendar_pkey PRIMARY KEY (calendar_id_);


--
-- TOC entry 1836 (class 2606 OID 16462)
-- Dependencies: 1536 1536
-- Name: email_draftbox_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY email_draftbox
    ADD CONSTRAINT email_draftbox_pkey PRIMARY KEY (draft_id_);


--
-- TOC entry 1838 (class 2606 OID 16464)
-- Dependencies: 1538 1538
-- Name: email_usersetting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY email_usersetting
    ADD CONSTRAINT email_usersetting_pkey PRIMARY KEY (setting_id_);


--
-- TOC entry 1828 (class 2606 OID 16466)
-- Dependencies: 1530 1530
-- Name: pk_applyid_; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY apply
    ADD CONSTRAINT pk_applyid_ PRIMARY KEY (aid_);


--
-- TOC entry 1834 (class 2606 OID 16468)
-- Dependencies: 1535 1535
-- Name: pk_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY configurations
    ADD CONSTRAINT pk_key PRIMARY KEY (key_);


--
-- TOC entry 1842 (class 2606 OID 16470)
-- Dependencies: 1541 1541
-- Name: pk_pid; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY profiles
    ADD CONSTRAINT pk_pid PRIMARY KEY (pid_);


--
-- TOC entry 1840 (class 2606 OID 16472)
-- Dependencies: 1540 1540
-- Name: pk_pwlink; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY profile_webware_link
    ADD CONSTRAINT pk_pwlink PRIMARY KEY (pwid_);


--
-- TOC entry 1844 (class 2606 OID 16474)
-- Dependencies: 1542 1542
-- Name: pk_rid_; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY relation
    ADD CONSTRAINT pk_rid_ PRIMARY KEY (rid_);


--
-- TOC entry 1848 (class 2606 OID 16476)
-- Dependencies: 1544 1544
-- Name: pk_uid; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT pk_uid PRIMARY KEY (uid_);


--
-- TOC entry 1850 (class 2606 OID 16478)
-- Dependencies: 1545 1545
-- Name: pk_webwareid_; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY webwares
    ADD CONSTRAINT pk_webwareid_ PRIMARY KEY (wid_);


--
-- TOC entry 1846 (class 2606 OID 16480)
-- Dependencies: 1543 1543
-- Name: save_userfile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY save_userfile
    ADD CONSTRAINT save_userfile_pkey PRIMARY KEY (uid_);


--
-- TOC entry 1851 (class 2606 OID 16481)
-- Dependencies: 1533 1531 1829
-- Name: calendar_event_calendar_id__fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY calendar_event
    ADD CONSTRAINT calendar_event_calendar_id__fkey FOREIGN KEY (calendar_id_) REFERENCES calendar(calendar_id_);


--
-- TOC entry 1852 (class 2606 OID 16486)
-- Dependencies: 1533 1531 1829
-- Name: calendar_event_calendar_id__fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY calendar_event
    ADD CONSTRAINT calendar_event_calendar_id__fkey1 FOREIGN KEY (calendar_id_) REFERENCES calendar(calendar_id_);


--
-- TOC entry 1853 (class 2606 OID 16491)
-- Dependencies: 1533 1531 1829
-- Name: calendar_event_calendar_id__fkey2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY calendar_event
    ADD CONSTRAINT calendar_event_calendar_id__fkey2 FOREIGN KEY (calendar_id_) REFERENCES calendar(calendar_id_);


--
-- TOC entry 1854 (class 2606 OID 16496)
-- Dependencies: 1829 1531 1533
-- Name: calendar_event_calendar_id__fkey3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY calendar_event
    ADD CONSTRAINT calendar_event_calendar_id__fkey3 FOREIGN KEY (calendar_id_) REFERENCES calendar(calendar_id_);


--
-- TOC entry 1855 (class 2606 OID 16501)
-- Dependencies: 1533 1829 1531
-- Name: calendar_event_calendar_id__fkey4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY calendar_event
    ADD CONSTRAINT calendar_event_calendar_id__fkey4 FOREIGN KEY (calendar_id_) REFERENCES calendar(calendar_id_);


--
-- TOC entry 1856 (class 2606 OID 16506)
-- Dependencies: 1531 1829 1533
-- Name: calendar_event_calendar_id__fkey5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY calendar_event
    ADD CONSTRAINT calendar_event_calendar_id__fkey5 FOREIGN KEY (calendar_id_) REFERENCES calendar(calendar_id_);


--
-- TOC entry 1857 (class 2606 OID 16511)
-- Dependencies: 1533 1544 1847
-- Name: calendar_event_user_id__fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY calendar_event
    ADD CONSTRAINT calendar_event_user_id__fkey FOREIGN KEY (user_id_) REFERENCES users(uid_);


--
-- TOC entry 1858 (class 2606 OID 16516)
-- Dependencies: 1533 1544 1847
-- Name: calendar_event_user_id__fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY calendar_event
    ADD CONSTRAINT calendar_event_user_id__fkey1 FOREIGN KEY (user_id_) REFERENCES users(uid_);


--
-- TOC entry 1859 (class 2606 OID 16521)
-- Dependencies: 1544 1847 1533
-- Name: calendar_event_user_id__fkey2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY calendar_event
    ADD CONSTRAINT calendar_event_user_id__fkey2 FOREIGN KEY (user_id_) REFERENCES users(uid_);


--
-- TOC entry 1860 (class 2606 OID 16526)
-- Dependencies: 1544 1533 1847
-- Name: calendar_event_user_id__fkey3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY calendar_event
    ADD CONSTRAINT calendar_event_user_id__fkey3 FOREIGN KEY (user_id_) REFERENCES users(uid_);


--
-- TOC entry 1861 (class 2606 OID 16531)
-- Dependencies: 1544 1847 1533
-- Name: calendar_event_user_id__fkey4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY calendar_event
    ADD CONSTRAINT calendar_event_user_id__fkey4 FOREIGN KEY (user_id_) REFERENCES users(uid_);


--
-- TOC entry 1862 (class 2606 OID 16536)
-- Dependencies: 1533 1847 1544
-- Name: calendar_event_user_id__fkey5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY calendar_event
    ADD CONSTRAINT calendar_event_user_id__fkey5 FOREIGN KEY (user_id_) REFERENCES users(uid_);


--
-- TOC entry 1863 (class 2606 OID 16541)
-- Dependencies: 1544 1536 1847
-- Name: email_draftbox_email_id__fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY email_draftbox
    ADD CONSTRAINT email_draftbox_email_id__fkey FOREIGN KEY (email_id_) REFERENCES users(uid_);


--
-- TOC entry 1864 (class 2606 OID 16546)
-- Dependencies: 1544 1847 1538
-- Name: email_usersetting_userid__fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY email_usersetting
    ADD CONSTRAINT email_usersetting_userid__fkey FOREIGN KEY (userid_) REFERENCES users(uid_);


--
-- TOC entry 1865 (class 2606 OID 16551)
-- Dependencies: 1847 1544 1538
-- Name: email_usersetting_userid__fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY email_usersetting
    ADD CONSTRAINT email_usersetting_userid__fkey1 FOREIGN KEY (userid_) REFERENCES users(uid_);


--
-- TOC entry 1866 (class 2606 OID 16556)
-- Dependencies: 1538 1847 1544
-- Name: email_usersetting_userid__fkey2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY email_usersetting
    ADD CONSTRAINT email_usersetting_userid__fkey2 FOREIGN KEY (userid_) REFERENCES users(uid_);


--
-- TOC entry 1867 (class 2606 OID 16561)
-- Dependencies: 1540 1841 1541
-- Name: fk_pid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profile_webware_link
    ADD CONSTRAINT fk_pid FOREIGN KEY (pid_) REFERENCES profiles(pid_);


--
-- TOC entry 1875 (class 2606 OID 16566)
-- Dependencies: 1847 1541 1544
-- Name: fk_uid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profiles
    ADD CONSTRAINT fk_uid FOREIGN KEY (uid_) REFERENCES users(uid_);


--
-- TOC entry 1868 (class 2606 OID 16571)
-- Dependencies: 1540 1849 1545
-- Name: fk_wid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profile_webware_link
    ADD CONSTRAINT fk_wid FOREIGN KEY (wid_) REFERENCES webwares(wid_);


--
-- TOC entry 1869 (class 2606 OID 16576)
-- Dependencies: 1540 1541 1841
-- Name: profile_webware_link_pid__fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profile_webware_link
    ADD CONSTRAINT profile_webware_link_pid__fkey FOREIGN KEY (pid_) REFERENCES profiles(pid_);


--
-- TOC entry 1870 (class 2606 OID 16581)
-- Dependencies: 1540 1841 1541
-- Name: profile_webware_link_pid__fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profile_webware_link
    ADD CONSTRAINT profile_webware_link_pid__fkey1 FOREIGN KEY (pid_) REFERENCES profiles(pid_);


--
-- TOC entry 1871 (class 2606 OID 16586)
-- Dependencies: 1841 1540 1541
-- Name: profile_webware_link_pid__fkey2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profile_webware_link
    ADD CONSTRAINT profile_webware_link_pid__fkey2 FOREIGN KEY (pid_) REFERENCES profiles(pid_);


--
-- TOC entry 1872 (class 2606 OID 16591)
-- Dependencies: 1849 1545 1540
-- Name: profile_webware_link_wid__fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profile_webware_link
    ADD CONSTRAINT profile_webware_link_wid__fkey FOREIGN KEY (wid_) REFERENCES webwares(wid_);


--
-- TOC entry 1873 (class 2606 OID 16596)
-- Dependencies: 1545 1849 1540
-- Name: profile_webware_link_wid__fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profile_webware_link
    ADD CONSTRAINT profile_webware_link_wid__fkey1 FOREIGN KEY (wid_) REFERENCES webwares(wid_);


--
-- TOC entry 1874 (class 2606 OID 16601)
-- Dependencies: 1849 1545 1540
-- Name: profile_webware_link_wid__fkey2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profile_webware_link
    ADD CONSTRAINT profile_webware_link_wid__fkey2 FOREIGN KEY (wid_) REFERENCES webwares(wid_);


--
-- TOC entry 1876 (class 2606 OID 16606)
-- Dependencies: 1544 1847 1541
-- Name: profiles_uid__fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profiles
    ADD CONSTRAINT profiles_uid__fkey FOREIGN KEY (uid_) REFERENCES users(uid_);


--
-- TOC entry 1877 (class 2606 OID 16611)
-- Dependencies: 1847 1544 1541
-- Name: profiles_uid__fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profiles
    ADD CONSTRAINT profiles_uid__fkey1 FOREIGN KEY (uid_) REFERENCES users(uid_);


--
-- TOC entry 1878 (class 2606 OID 16616)
-- Dependencies: 1544 1847 1541
-- Name: profiles_uid__fkey2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profiles
    ADD CONSTRAINT profiles_uid__fkey2 FOREIGN KEY (uid_) REFERENCES users(uid_);


--
-- TOC entry 1879 (class 2606 OID 16621)
-- Dependencies: 1847 1543 1544
-- Name: save_userfile_uid__fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY save_userfile
    ADD CONSTRAINT save_userfile_uid__fkey FOREIGN KEY (uid_) REFERENCES users(uid_) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 1884 (class 0 OID 0)
-- Dependencies: 5
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2011-05-01 19:29:23

--
-- PostgreSQL database dump complete
--

